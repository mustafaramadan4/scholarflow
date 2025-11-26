import { useEffect, useState } from 'react';
import { getMyApplications } from '../utils/api';

export default function Applications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    getMyApplications().then(setApps).catch(console.error);
  }, []);

  return (
    <div>
      <h1>My Applications</h1>
      {apps.length === 0 ? <p>No applications yet.</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20 }}>
          <thead><tr style={{ textAlign: 'left', background: '#f4f4f4' }}><th style={{ padding: 10 }}>Scholarship ID</th><th style={{ padding: 10 }}>Status</th></tr></thead>
          <tbody>
            {apps.map((app) => (
              <tr key={app.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 10 }}>{app.scholarship_id}</td>
                <td style={{ padding: 10 }}>{app.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
