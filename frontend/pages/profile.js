import { useEffect, useState } from 'react';
import { getMyProfile, createOrUpdateProfile } from '../utils/api';
import ProfileSetup from './profile-setup/step-1';

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [showSetup, setShowSetup] = useState(false);

  useEffect(() => {
    getMyProfile()
      .then(data => {
        if (!data || Object.keys(data).length === 0) {
          setShowSetup(true);
        } else {
          setProfile(data);
          setFormData({
            fullName: data.full_name,
            highSchool: data.high_school,
            gradeLevel: data.grade_level,
            state: data.state,
            major: data.intended_major,
            gpaUnweighted: data.gpa_unweighted,
            gpaWeighted: data.gpa_weighted,
            citizenship: data.citizenship,
            firstGen: data.first_gen,
            ethnicity: data.ethnicity,
            extracurriculars: data.extracurriculars,
            sports: data.sports,
            satScore: data.sat_score,
            actScore: data.act_score,
            apCount: data.ap_count,
            honors: data.honors_text || data.honors,
            volunteerHours: data.volunteer_hours,
            transcriptFile: data.transcript_url,
            resumeFile: data.resume_url,
            weeklyHours: data.weekly_hours,
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setShowSetup(true);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await createOrUpdateProfile(formData);
    setProfile(data);
    setIsEditing(false);
  };

  const handleSetupComplete = async () => {
    // After onboarding finishes, reload the profile from backend
    const data = await getMyProfile();
    setProfile(data);
    setShowSetup(false);
    setFormData({
      fullName: data.full_name,
      highSchool: data.high_school,
      gradeLevel: data.grade_level,
      state: data.state,
      major: data.intended_major,
      gpaUnweighted: data.gpa_unweighted,
      gpaWeighted: data.gpa_weighted,
      citizenship: data.citizenship,
      firstGen: data.first_gen,
      ethnicity: data.ethnicity,
      extracurriculars: data.extracurriculars,
      sports: data.sports,
      satScore: data.sat_score,
      actScore: data.act_score,
      apCount: data.ap_count,
      honors: data.honors_text || data.honors,
      volunteerHours: data.volunteer_hours,
      transcriptFile: data.transcript_url,
      resumeFile: data.resume_url,
      weeklyHours: data.weekly_hours,
    });
  };

  if (loading) return <div>Loading...</div>;

  // Show ProfileSetup for new users
  if (showSetup) return <ProfileSetup onComplete={handleSetupComplete} />;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Student Profile</h1>
        {!isEditing && <button onClick={() => setIsEditing(true)}>Edit</button>}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 400 }}>
          <input 
            type="text" 
            placeholder="Full Name" 
            value={formData.fullName || ''} 
            onChange={(e) => setFormData({...formData, fullName: e.target.value})} 
            style={{ padding: 8 }} 
          />
          <input 
            type="text" 
            placeholder="High School" 
            value={formData.highSchool || ''} 
            onChange={(e) => setFormData({...formData, highSchool: e.target.value})} 
            style={{ padding: 8 }} 
          />
          <input 
            type="text" 
            placeholder="Major" 
            value={formData.major || ''} 
            onChange={(e) => setFormData({...formData, major: e.target.value})} 
            style={{ padding: 8 }} 
          />
          <input 
            type="number" 
            placeholder="Unweighted GPA" 
            step="0.01" 
            value={formData.gpaUnweighted || ''} 
            onChange={(e) => setFormData({...formData, gpaUnweighted: parseFloat(e.target.value)})} 
            style={{ padding: 8 }} 
          />
          <input 
            type="number" 
            placeholder="Weighted GPA" 
            step="0.01" 
            value={formData.gpaWeighted || ''} 
            onChange={(e) => setFormData({...formData, gpaWeighted: parseFloat(e.target.value)})} 
            style={{ padding: 8 }} 
          />
          <button type="submit" style={{ padding: 10, background: '#2c7a7b', color: 'white' }}>Save</button>
        </form>
      ) : (
        <div style={{ background: '#f9f9f9', padding: 20 }}>
          <p><strong>Name:</strong> {profile.full_name}</p>
          <p><strong>High School:</strong> {profile.high_school}</p>
          <p><strong>Major:</strong> {profile.intended_major}</p>
          <p><strong>Unweighted GPA:</strong> {profile.gpa_unweighted}</p>
          <p><strong>Weighted GPA:</strong> {profile.gpa_weighted}</p>
        </div>
      )}
    </div>
  );
}
