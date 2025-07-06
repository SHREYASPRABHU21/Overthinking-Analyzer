// src/App.jsx
import { useState } from 'react';
import './styles.css';
import { analyzeThought } from './api';
import ReactMarkdown from 'react-markdown';

function App() {
  const [thought, setThought] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!thought.trim()) return;
    setLoading(true);
    try {
      const result = await analyzeThought(thought);
      setResponse(result);
    } catch (err) {
      setResponse(err.message || 'An error occurred while analyzing your thought.');
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>🧠 Overthinking Analyzer</h1>
      <p>Type a stressful thought and get an AI-powered breakdown.</p>
      
      <textarea
        placeholder="e.g., I feel like I'll never succeed..."
        value={thought}
        onChange={(e) => setThought(e.target.value)}
      />

      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze My Thought'}
      </button>

      {response && (
        <div className="output">
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      )}

      {/* Ads Placeholder */}
      <div className="ads">
        <p>[Ad here]</p>
      </div>

      {/* Premium Unlock Section */}
      <div className="premium">
        <p>✨ Want deeper insight or journaling support?</p>
        <a href="https://rzp.io/l/YOUR_RAZORPAY_LINK" target="_blank" rel="noreferrer">
          <button className="premium-btn">Unlock Premium</button>
        </a>
      </div>
    </div>
  );
}

export default App;
