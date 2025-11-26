import { useState } from 'react';
import { generateEssay } from '../utils/api';

export default function EssayGenerator() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try { setResult((await generateEssay(prompt, 500)).text); }
    catch (err) { alert('Error generating essay'); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <h1>AI Essay Assistant</h1>
      <div style={{ display: 'flex', gap: 40, marginTop: 20 }}>
        <form onSubmit={handleGenerate} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 15 }}>
          <textarea rows={6} style={{ width: '100%', padding: 10 }} value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Essay Prompt..." required />
          <button type="submit" disabled={loading} style={{ padding: '12px', background: '#0070f3', color: 'white', border: 'none', cursor: 'pointer' }}>{loading ? 'Generating...' : 'Generate'}</button>
        </form>
        <div style={{ flex: 1, background: '#f9f9f9', padding: 20, borderRadius: 8 }}>
          <p style={{ whiteSpace: 'pre-wrap' }}>{result || "Your generated essay will appear here."}</p>
        </div>
      </div>
    </div>
  );
}
