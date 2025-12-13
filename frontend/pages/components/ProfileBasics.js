import React from 'react';

export default function ProfileBasics({ data, update, onNext }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Basic Profile</h2>
      <p className="text-gray-500 text-sm">These details help us calculate your eligibility.</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Jane Doe"
            value={data.fullName || ''}
            onChange={(e) => update('fullName', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">High School Name</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Lincoln High School"
            value={data.highSchool || ''}
            onChange={(e) => update('highSchool', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unweighted GPA</label>
            <input
              type="number"
              step="0.01"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="4.0"
              value={data.gpaUnweighted || ''}
              onChange={(e) => update('gpaUnweighted', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weighted GPA</label>
            <input
              type="number"
              step="0.01"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="4.5"
              value={data.gpaWeighted || ''}
              onChange={(e) => update('gpaWeighted', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Intended Major</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Computer Science, Biology, Undecided..."
            value={data.major || ''}
            onChange={(e) => update('major', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Household Income Range (Optional)</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg bg-white outline-none"
            value={data.incomeRange || ''}
            onChange={(e) => update('incomeRange', e.target.value)}
          >
            <option value="">Prefer not to say</option>
            <option value="low">Less than $30,000</option>
            <option value="mid_low">$30,000 - $60,000</option>
            <option value="mid_high">$60,000 - $100,000</option>
            <option value="high">More than $100,000</option>
          </select>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Next Step
      </button>
    </div>
  );
}
