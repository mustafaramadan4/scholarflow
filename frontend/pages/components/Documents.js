import React from 'react';

// Reusable File Upload Component
const FileUpload = ({ label, fileName, onFileSelect }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition">
        
        {fileName ? (
          <div className="flex items-center space-x-2 text-green-600">
            <span className="text-xl">📄</span>
            <span className="font-medium text-sm truncate max-w-[200px]">{fileName}</span>
            <button className="text-xs text-gray-400 underline ml-2">Change</button>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-2">Drag & drop or click to upload</p>
            <span className="text-xs text-gray-400">(PDF, DOCX up to 5MB)</span>
          </>
        )}
        
        <input 
          type="file" 
          className="absolute opacity-0 w-full h-full cursor-pointer top-0 left-0" // Overlay input on top of div
          style={{ position: 'relative', marginTop: -50, height: 50, zIndex: 10 }}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              onFileSelect(e.target.files[0].name);
            }
          }}
        />
      </div>
    </div>
  );
};

export default function Documents({ data, update, onNext }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
      <p className="text-gray-500 text-sm">Upload your materials now to auto-fill applications later.</p>

      <FileUpload 
        label="High School Transcript" 
        fileName={data.transcriptFile}
        onFileSelect={(name) => update('transcriptFile', name)}
      />

      <FileUpload 
        label="Resume (Optional)" 
        fileName={data.resumeFile}
        onFileSelect={(name) => update('resumeFile', name)}
      />
      
      <div className="pt-4 space-y-3">
        <h3 className="font-medium text-gray-900">Essay Import</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
            Import Common App
          </button>
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
            Paste Existing Essay
          </button>
        </div>
      </div>

      <button onClick={onNext} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mt-4">
        Next Step
      </button>
    </div>
  );
}
