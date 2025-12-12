import { useEffect, useState } from 'react';
import { searchScholarships, createApplication, getMyProfile, getMyApplications } from '../utils/api'; 
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [profileId, setProfileId] = useState(null); 
  const [appliedIds, setAppliedIds] = useState([]);
  
  const router = useRouter();

  useEffect(() => { 
    initData();
  }, [router]);

  // --- Load profile and applications ---
  const initData = async () => {
    await loadProfile();
    await loadScholarships();
    await loadAppliedApplications();
  }

  const loadProfile = async () => {
    try {
      const profile = await getMyProfile();
      setProfileId(profile.id);
    } catch (err) {
      if (err.response?.status === 404) {
        toast.error("Please create your profile before applying.");
        router.push("/profile");
        return; 
      }
      if (err.response?.status === 401) {
        toast.error("Session expired or token invalid. Redirecting to login.");
        localStorage.removeItem('scholarflow_token');
        router.push("/login");
        return;
      }
      toast.error("Failed to load profile.");
    }
  };

  const loadScholarships = async (q = "") => {
    try { 
      setLoading(true); 
      setScholarships(await searchScholarships(q)); 
    } catch (err) { 
      toast.error("Failed to load scholarships"); 
    } finally { 
      setLoading(false); 
    }
  };

  // --- Load already applied scholarships ---
  const loadAppliedApplications = async () => {
    try {
      const apps = await getMyApplications();
      const appliedIds = apps.map(app => app.scholarship_id);
      setAppliedIds(appliedIds);
    } catch (err) {
      console.error("Failed to load applied scholarships:", err);
    }
  }

  const handleApply = async (scholarshipId) => { 
    if (!profileId) {
      toast.error('User profile not loaded. Cannot apply.');
      return;
    }

    try {
      await createApplication(scholarshipId);
      setAppliedIds(prevIds => [...prevIds, scholarshipId]);
      toast.success('Application submitted successfully!');
    } catch (err) { 
      toast.error('Failed to apply. Check your profile.'); 
    }
  };

  return (
    <div>
      <h1>Find Scholarships</h1>
      <form onSubmit={(e) => { e.preventDefault(); loadScholarships(query); }} style={{ marginBottom: 30, display: 'flex', gap: 10 }}>
        <input type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} required style={{ flex: 1, padding: 10 }} />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Search</button>
      </form>
      {loading ? <p>Loading...</p> : (
        <div style={{ display: 'grid', gap: 20 }}>
          {scholarships.map((s) => {
            const isApplied = appliedIds.includes(s.id); 
            return (
              <div key={s.id} style={{ border: '1px solid #ddd', padding: 20, borderRadius: 8 }}>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <p><strong>Amount:</strong> ${s.amount_min} - ${s.amount_max}</p>
                <button 
                  onClick={() => handleApply(s.id)} 
                  disabled={isApplied} 
                  style={{ 
                    backgroundColor: isApplied ? '#ccc' : '#0070f3', 
                    color: 'white', 
                    border: 'none', 
                    padding: '10px 20px', 
                    cursor: isApplied ? 'default' : 'pointer', 
                    borderRadius: 4 
                  }}
                >
                  {isApplied ? 'Applied' : 'Apply Now'} 
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}