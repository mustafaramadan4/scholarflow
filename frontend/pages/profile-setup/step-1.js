import { useState } from 'react';
import WelcomeScreen from '../components/WelcomeScreen';
import RoleSelection from '../components/RoleSelection';
import AccountSetup from '../components/AccountSetup';
import ProfileBasics from '../components/ProfileBasics';
import Eligibility from '../components/Eligibility';
import Achievements from '../components/Achievements';
import Documents from '../components/Documents';
import Preferences from '../components/Preferences';
import { createOrUpdateProfile } from '../../utils/api';
import OnboardingLayout from '../../components/layout/OnboardingLayout';

export default function ProfileSetup() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});

  const update = (key, value) => setData(prev => ({ ...prev, [key]: value }));

  const nextStep = () => setStep(prev => prev + 1);

const submitProfile = async () => {
  try {
    await createOrUpdateProfile(data);
    alert('Profile saved successfully!');
    if (onComplete) onComplete();  // <-- notify parent
  } catch (err) {
    console.error(err);
    alert('Error saving profile. Please try again.');
  }
};

  const steps = [
    <WelcomeScreen onNext={nextStep} />,
    <RoleSelection data={data} update={update} onNext={nextStep} />,
    <AccountSetup data={data} update={update} onNext={nextStep} />,
    <ProfileBasics data={data} update={update} onNext={nextStep} />,
    <Eligibility data={data} update={update} onNext={nextStep} />,
    <Achievements data={data} update={update} onNext={nextStep} />,
    <Documents data={data} update={update} onNext={nextStep} />,
    <Preferences data={data} update={update} onSubmit={submitProfile} />
  ];

  return (
    <OnboardingLayout>
      {steps[step]}
    </OnboardingLayout>
  );
}