import React from 'react';

export default function Achievements({ data, update, onNext }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Achievements</h2>

      {/* Test Scores */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Test Scores</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase">SAT Score</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="1600"
              value={data.satScore || ''}
              onChange={(e) => update('satScore', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase">ACT Score</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="36"
              value={data.actScore || ''}
              onChange={(e) => update('actScore', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase">AP Classes</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder="# Taken"
              value={data.apCount || ''}
              onChange={(e) => update('apCount', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4"></div>

      {/* Free Text Inputs for variable data */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Honors & Awards</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg h-24 text-sm"
            placeholder="e.g. National Merit Scholar, Honor Roll, 1st Place Science Fair..."
            value={data.honors || ''}
            onChange={(e) => update('honors', e.target.value)}
          />
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Volunteer Hours (Total)</label>
           <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="e.g. 50"
              value={data.volunteerHours || ''}
              onChange={(e) => update('volunteerHours', e.target.value)}
            />
        </div>
      </div>

      <button onClick={onNext} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
        Next Step
      </button>
    </div>
  );
}
