export default function AccountSetup({ update, data, onNext }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Create Account</h2>
      
      <input 
        type="email" 
        placeholder="Email" 
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        value={data.email}
        onChange={(e) => update('email', e.target.value)}
      />
      <input 
        type="password" 
        placeholder="Password" 
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        value={data.password}
        onChange={(e) => update('password', e.target.value)}
      />
      
      <select 
        className="w-full p-3 border border-gray-300 rounded-lg bg-white"
        onChange={(e) => update('gradeLevel', e.target.value)}
      >
        <option value="">Select Grade Level</option>
        <option value="9">Freshman (9th)</option>
        <option value="10">Sophomore (10th)</option>
        <option value="11">Junior (11th)</option>
        <option value="12">Senior (12th)</option>
      </select>

      <button onClick={onNext} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold mt-4">
        Create Account
      </button>
    </div>
  );
}
