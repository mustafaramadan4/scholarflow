export default function WelcomeScreen({ onNext }) {
  return (
    <div className="text-center space-y-6">
      <div className="text-3xl font-bold text-blue-600">ScholarFlow</div>
      <h1 className="text-2xl font-bold text-gray-900">👋 Welcome!</h1>
      <p className="text-gray-600">The easiest way to find and apply for scholarships.</p>
      
      <div className="bg-blue-50 p-4 rounded-lg text-left text-sm space-y-2 text-gray-700">
        <p>• One profile for all applications</p>
        <p>• Personalized matches with confidence scores</p>
        <p>• Auto-fill forms + essay assistance</p>
        <p>• Track deadlines in one place</p>
      </div>

      <div className="space-y-3 pt-4">
        <button onClick={onNext} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Get Started
        </button>
        <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
          Log In
        </button>
      </div>
    </div>
  );
}
