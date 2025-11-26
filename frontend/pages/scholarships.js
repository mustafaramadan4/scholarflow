import { useEffect, useState } from 'react';
import { searchScholarships, createApplication } from '../utils/api';
import toast from 'react-hot-toast';

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => { loadScholarships(); }, []);

  const loadScholarships = async (q = "") => {
    try { setLoading(true); setScholarships(await searchScholarships(q)); }
    catch (err) { toast.error("Failed to load scholarships"); }
    finally { setLoading(false); }
  };

  const handleApply = async (id) => {
    try { await createApplication(id); toast.success('Application submitted successfully!'); }
    catch (err) { toast.error('Failed to apply. Check your profile.'); }
  };

  return (
    <div>
      <h1>Find Scholarships</h1>
      <form onSubmit={(e) => { e.preventDefault(); loadScholarships(query); }} style={{ marginBottom: 30, display: 'flex', gap: 10 }}>
        <input type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} style={{ flex: 1, padding: 10 }} />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Search</button>
      </form>
      {loading ? <p>Loading...</p> : (
        <div style={{ display: 'grid', gap: 20 }}>
          {scholarships.map((s) => (
            <div key={s.id} style={{ border: '1px solid #ddd', padding: 20, borderRadius: 8 }}>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <p><strong>Amount:</strong> ${s.amount_min} - ${s.amount_max}</p>
              <button onClick={() => handleApply(s.id)} style={{ backgroundColor: '#0070f3', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer', borderRadius: 4 }}>Apply Now</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
