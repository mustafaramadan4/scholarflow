export default function Preferences({ update, data, onSubmit }) {
  const types = ["Need-based", "Merit-based", "Local", "STEM-specific", "Essay-free"];

  const toggleType = (t) => {
    // Logic to toggle item in an array (implementation omitted for brevity)
    console.log("Toggle", t); 
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Final Preferences</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Scholarship Types</label>
        <div className="flex flex-wrap gap-2">
          {types.map(type => (
            <button 
              key={type}
              onClick={() => toggleType(type)}
              className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200"
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Time available weekly: {data.weeklyHours || 0} hours
        </label>
        <input 
          type="range" 
          min="0" 
          max="10" 
          step="1"
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          onChange={(e) => update('weeklyHours', e.target.value)}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0 hr</span>
          <span>10 hrs</span>
        </div>
      </div>

      <button onClick={onSubmit} className="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition">
        Finish Setup
      </button>
    </div>
  );
}
