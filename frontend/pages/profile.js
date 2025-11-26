import { useEffect, useState } from 'react';
import { getMyProfile, createOrUpdateProfile } from '../utils/api';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    getMyProfile().then(data => { setProfile(data); setFormData(data); setLoading(false); })
      .catch(() => { setIsEditing(true); setLoading(false); });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await createOrUpdateProfile(formData);
    setProfile(data); setIsEditing(false);
  };

  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Student Profile</h1>
        {!isEditing && <button onClick={() => setIsEditing(true)}>Edit</button>}
      </div>
      {isEditing ? (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 400 }}>
          <input type="text" placeholder="Preferred Name" value={formData.preferred_name || ''} onChange={(e) => setFormData({...formData, preferred_name: e.target.value})} style={{ padding: 8 }} />
          <input type="text" placeholder="Major" value={formData.intended_major || ''} onChange={(e) => setFormData({...formData, intended_major: e.target.value})} style={{ padding: 8 }} />
          <input type="number" placeholder="GPA" step="0.01" value={formData.gpa || ''} onChange={(e) => setFormData({...formData, gpa: parseFloat(e.target.value)})} style={{ padding: 8 }} />
          <button type="submit" style={{ padding: 10, background: '#2c7a7b', color: 'white' }}>Save</button>
        </form>
      ) : (
        <div style={{ background: '#f9f9f9', padding: 20 }}>
          <p><strong>Name:</strong> {profile.preferred_name}</p>
          <p><strong>Major:</strong> {profile.intended_major}</p>
          <p><strong>GPA:</strong> {profile.gpa}</p>
        </div>
      )}
    </div>
  );
}
