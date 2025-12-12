// frontend/app/onboarding/page.js
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Import sub-components (we will create these below)
import WelcomeScreen from './components/WelcomeScreen';
import RoleSelection from './components/RoleSelection';
import AccountSetup from './components/AccountSetup';
import ProfileBasics from './components/ProfileBasics';
import Eligibility from './components/Eligibility';
import Achievements from './components/Achievements';
import Documents from './components/Documents';
import Preferences from './components/Preferences';

export default function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: '',
    email: '',
    password: '',
    gradeLevel: '',
    state: '',
    // Profile Data
    gpaWeighted: '',
    major: '',
    incomeRange: '',
    citizenship: '',
    firstGen: false,
    interests: [],
    // ... add other fields as needed
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Generic handler for input changes
  const updateFormData = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleFinalSubmit = async () => {
    // TODO: POST formData to your FastAPI backend
    console.log("Submitting to backend:", formData);
    // await fetch('http://localhost:8000/api/profile', { ... })
    
    router.push('/dashboard'); // Redirect after success
  };

  // Render the correct screen based on step
  const renderStep = () => {
    switch(step) {
      case 1: return <WelcomeScreen onNext={nextStep} />;
      case 2: return <RoleSelection data={formData} update={updateFormData} onNext={nextStep} />;
      case 3: return <AccountSetup data={formData} update={updateFormData} onNext={nextStep} />;
      // Profile Builder
      case 4: return <ProfileBasics data={formData} update={updateFormData} onNext={nextStep} />;
      case 5: return <Eligibility data={formData} update={updateFormData} onNext={nextStep} />;
      case 6: return <Achievements data={formData} update={updateFormData} onNext={nextStep} />;
      case 7: return <Documents data={formData} update={updateFormData} onNext={nextStep} />;
      case 8: return <Preferences data={formData} update={updateFormData} onSubmit={handleFinalSubmit} />;
      default: return <div>Error</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden p-6">
        {/* Progress Bar (Optional) */}
        {step > 1 && (
          <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(step / 8) * 100}%` }}
            ></div>
          </div>
        )}
        
        {renderStep()}
        
        {/* Back Button for UX */}
        {step > 1 && step < 8 && (
          <button onClick={prevStep} className="mt-4 text-sm text-gray-500 hover:text-gray-800">
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
