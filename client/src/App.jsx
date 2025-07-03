// client/src/App.jsx

import React, { useState, useEffect } from 'react';
import './App.css';
import TypingChallenge from './components/TypingChallenge'; // Import the new component

function App() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSnippet, setSelectedSnippet] = useState(null); // State to hold the currently selected snippet

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/snippets');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSnippets(data);
        if (data.length > 0) {
          setSelectedSnippet(data[0]); // Automatically select the first snippet
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSnippets();
  }, []); // Empty dependency array means this runs once on mount

  const handleSnippetSelect = (snippetId) => {
    const snippet = snippets.find(s => s._id === snippetId);
    setSelectedSnippet(snippet);
  };


  if (loading) {
    return <div className="app-container">Loading snippets...</div>;
  }

  if (error) {
    return <div className="app-container" style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div className="app-container">
      <h1>Code Snippets for Typing Practice</h1>

      {/* List of snippets to choose from */}
      <div className="snippets-selector">
        <h2>Select a Snippet:</h2>
        {snippets.map((snippet) => (
          <button
            key={snippet._id}
            onClick={() => handleSnippetSelect(snippet._id)}
            className={selectedSnippet && selectedSnippet._id === snippet._id ? 'selected-snippet-btn' : 'snippet-btn'}
          >
            {snippet.title} ({snippet.language})
          </button>
        ))}
      </div>

      {/* Render the TypingChallenge component, passing the selectedSnippet as a prop */}
      {selectedSnippet && <TypingChallenge selectedSnippet={selectedSnippet} />}

      {!selectedSnippet && snippets.length > 0 && (
        <p>Please select a snippet to begin typing.</p>
      )}
      {snippets.length === 0 && (
          <p>No snippets found. Check your backend server and database.</p>
      )}

    </div>
  );
}

export default App;