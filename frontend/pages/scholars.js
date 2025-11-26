import { useEffect, useState } from 'react';
import { getScholars } from '../utils/api';
import Navbar from '../components/Navbar';

export default function Scholars() {
  const [scholars, setScholars] = useState([]);

  useEffect(() => {
    const fetchScholars = async () => {
      try {
        const data = await getScholars();
        setScholars(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchScholars();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <Navbar />
      <h1>Scholars</h1>
      {scholars.length === 0 ? (
        <p>No scholars found.</p>
      ) : (
        <ul>
          {scholars.map((s) => (
            <li key={s.id}>{s.name} - {s.email}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
