export default function RoleSelection({ update, data, onNext }) {
  const roles = ['High School Student', 'Parent / Guardian', 'Counselor / Educator'];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Who are you?</h2>
      <div className="space-y-3">
        {roles.map((role) => (
          <div 
            key={role}
            onClick={() => update('role', role)}
            className={`p-4 border-2 rounded-xl cursor-pointer flex items-center transition ${
              data.role === role ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
              data.role === role ? 'border-blue-600' : 'border-gray-300'
            }`}>
              {data.role === role && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
            </div>
            <span className="font-medium text-gray-800">{role}</span>
          </div>
        ))}
      </div>
      <button 
        onClick={onNext} 
        disabled={!data.role}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:bg-gray-300"
      >
        Continue
      </button>
    </div>
  );
}
