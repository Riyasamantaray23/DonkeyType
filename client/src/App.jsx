// client/src/App.jsx

import React, { useState, useEffect } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
// Choose a style. You can find more at: https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_STYLES_HLJS.MD
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// Register languages you need to highlight
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import sql from 'react-syntax-highlighter/dist/esm/languages/hljs/sql';

SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('sql', sql);


import './App.css'; // Your existing CSS

function App() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // New state to hold the currently selected snippet for typing
  const [selectedSnippet, setSelectedSnippet] = useState(null);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/snippets'); // Fetch from your backend API
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSnippets(data);
        // Automatically select the first snippet for display
        if (data.length > 0) {
          setSelectedSnippet(data[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSnippets();
  }, []);

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

      {/* Display the selected snippet's code */}
      {selectedSnippet && (
        <div className="typing-area-container">
          <h3>{selectedSnippet.title} ({selectedSnippet.difficulty})</h3>
          <p>{selectedSnippet.description}</p>
          <div className="code-display">
            <SyntaxHighlighter
              language={selectedSnippet.language === 'jsx' ? 'javascript' : selectedSnippet.language} // Use 'javascript' for 'jsx' highlighting if 'jsx' isn't fully supported by the theme
              style={docco}
              showLineNumbers={true}
            >
              {selectedSnippet.code}
            </SyntaxHighlighter>
          </div>
          {/* Typing input will go here */}
          <textarea
            className="typing-input"
            placeholder="Start typing here..."
            rows="10"
            cols="80"
            // We'll add logic for typing here later
          ></textarea>
        </div>
      )}

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