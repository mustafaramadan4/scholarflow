import { useEffect, useState } from 'react';
import { searchScholarships, createApplication, getMyProfile } from '../utils/api'; 
import toast from 'react-hot-toast';
import { useRouter } from 'next/router'; // <-- Added Router

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [profileId, setProfileId] = useState(null); 
  const [appliedIds, setAppliedIds] = useState([]);
  
  const router = useRouter(); // <-- Initialize Router

  // --- Authentication and Data Initialization ---
  useEffect(() => { 
    
    // 1. Check for token immediately
    const token = localStorage.getItem('scholarflow_token');
    
    // if (!token) {
    //     // If no token exists, redirect to login
    //     toast.error("Authentication required. Redirecting to login.");
    //     router.push('/login');
    //     return; 
    // }

    // 2. If token exists, load user profile (authenticated call)
    loadProfile(); 
    
    // 3. Load scholarships (can run in parallel/asynchronously)
    loadScholarships(); 

  }, [router]); 

  const loadProfile = async () => {
    try {
      // This call should succeed if the token is valid
      const profile = await getMyProfile();
      setProfileId(profile.id); // Assuming 'profile.id' is the StudentProfile ID
    } catch (err) {
      // If the backend returns a 401 (Unauthorized), the token is bad.
      toast.error("Session expired or token invalid. Redirecting to login.");
      
      // CRITICAL: Clear the bad token to prevent infinite loops
      localStorage.removeItem('scholarflow_token');
      // router.push('/login');
    }
  };
  
  const loadScholarships = async (q = "") => {
    try { 
      setLoading(true); 
      setScholarships(await searchScholarships(q)); 
    }
    catch (err) { 
      toast.error("Failed to load scholarships"); 
    }
    finally { 
      setLoading(false); 
    }
  };

  // --- Application Submission Logic ---
  const handleApply = async (scholarshipId) => { 
    // CRITICAL CHECK: Ensure profileId is available before API call
    if (!profileId) {
      toast.error('User profile not loaded. Cannot apply.');
      return;
    }

    try {
      // Send both required IDs to the backend
      await createApplication(profileId, scholarshipId);
      
      // Update local state to track this application ID
      setAppliedIds(prevIds => [...prevIds, scholarshipId]);
      
      toast.success('Application submitted successfully!');
    }
    catch (err) { 
      // Catches potential 422 validation errors or other application failures
      toast.error('Failed to apply. Check your profile.'); 
    }
  };

  // --- JSX Render ---
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