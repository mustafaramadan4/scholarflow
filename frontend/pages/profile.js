import { useEffect, useState } from 'react';
import { getProfile } from '../utils/api';
import Navbar from '../components/Navbar';

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return (
    <div style={{ padding: 40 }}>
      <Navbar />
      <p>Loading profile...</p>
    </div>
  );

  return (
    <div style={{ padding: 40 }}>
      <Navbar />
      <h1>Profile</h1>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
    </div>
  );
}
