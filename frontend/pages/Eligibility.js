import React from 'react';

// Helper component for selectable tags
const TagGroup = ({ label, options, selected = [], onToggle }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <button
            key={option}
            onClick={() => onToggle(option)}
            className={`px-3 py-1.5 rounded-full text-sm border transition ${
              isSelected
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  </div>
);

export default function Eligibility({ data, update, onNext }) {
  // Toggle logic for arrays
  const toggleSelection = (key, value) => {
    const currentList = data[key] || [];
    if (currentList.includes(value)) {
      update(key, currentList.filter((item) => item !== value));
    } else {
      update(key, [...currentList, value]);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Background & Interests</h2>

      {/* Demographics */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Citizenship</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg bg-white"
            value={data.citizenship || ''}
            onChange={(e) => update('citizenship', e.target.value)}
          >
            <option value="">Select...</option>
            <option value="US_Citizen">U.S. Citizen</option>
            <option value="Permanent_Resident">Permanent Resident</option>
            <option value="International">International</option>
            <option value="DACA">DACA / Undocumented</option>
          </select>
        </div>
        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">First Gen Student?</label>
           <div className="flex space-x-4 mt-2">
             <label className="flex items-center">
               <input 
                 type="radio" 
                 name="firstGen" 
                 checked={data.firstGen === true} 
                 onChange={() => update('firstGen', true)}
                 className="mr-2"
               /> Yes
             </label>
             <label className="flex items-center">
               <input 
                 type="radio" 
                 name="firstGen" 
                 checked={data.firstGen === false} 
                 onChange={() => update('firstGen', false)}
                 className="mr-2"
               /> No
             </label>
           </div>
        </div>
      </div>

      {/* Tag Groups */}
      <TagGroup 
        label="Race / Ethnicity (Optional)"
        options={['Asian', 'Black/African American', 'Hispanic/Latino', 'White', 'Native American', 'Pacific Islander']}
        selected={data.ethnicity}
        onToggle={(val) => toggleSelection('ethnicity', val)}
      />

      <TagGroup 
        label="Extracurriculars"
        options={['Student Gov', 'Debate', 'Robotics', 'Key Club', 'Yearbook', 'Theater', 'Band/Orchestra']}
        selected={data.extracurriculars}
        onToggle={(val) => toggleSelection('extracurriculars', val)}
      />
      
      <TagGroup 
        label="Sports"
        options={['Basketball', 'Soccer', 'Track', 'Football', 'Swimming', 'Tennis', 'Volleyball']}
        selected={data.sports}
        onToggle={(val) => toggleSelection('sports', val)}
      />

      <button onClick={onNext} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
        Next Step
      </button>
    </div>
  );
}
