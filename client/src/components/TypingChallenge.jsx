// client/src/components/TypingChallengeMonaco.jsx
import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { diff_match_patch } from 'diff-match-patch';

const dmp       = new diff_match_patch();
const WORD_SIZE = 5;                                // 1 word = 5 chars
const stripWS   = (s) => s.replace(/\s+/g, '');     // drop ALL whitespace

function TypingChallengeMonaco({ selectedSnippet }) {
  const [userCode,  setUserCode]  = useState('');
  const [accuracy,  setAccuracy]  = useState(100);
  const [wpm,       setWPM]       = useState(0);    // stays 0 until finished
  const [done,      setDone]      = useState(false);
  const startTimeRef              = useRef(null);
  const editorRef                 = useRef(null);

  /* ── reset on new snippet ── */
  useEffect(() => {
    if (!selectedSnippet) return;
    setUserCode('');
    setAccuracy(100);
    setWPM(0);
    setDone(false);
    startTimeRef.current = null;
    editorRef.current?.focus();
  }, [selectedSnippet]);

  /* ── evaluate each keystroke ── */
  useEffect(() => {
    if (!selectedSnippet) return;
    if (!userCode) return;                 // still empty

    // start timer on first keypress
    if (!startTimeRef.current) startTimeRef.current = Date.now();

    // live accuracy (whitespace‑agnostic)
    const target  = stripWS(selectedSnippet.code);
    const current = stripWS(userCode);
    const diffs   = dmp.diff_main(target, current);
    const edits   = dmp.diff_levenshtein(diffs);
    const accPct  =
      current.length === 0
        ? 100
        : ((current.length - edits) / current.length) * 100;
    setAccuracy(Math.max(0, Math.round(accPct)));

    // check completion
    const isFinished = current === target;
    if (isFinished && !done) {
      setDone(true);
      // compute WPM once, now that the text is correct & complete
      const minutes = (Date.now() - startTimeRef.current) / 1000 / 60;
      const words   = userCode.length / WORD_SIZE;
      setWPM(Math.max(0, Math.round(words / minutes)));
    }
  }, [userCode, selectedSnippet, done]);

  if (!selectedSnippet) return <p>Select a snippet…</p>;

  /* ── render ── */
  return (
    <div className="typing-area-container">
      <h3>
        {selectedSnippet.title} ({selectedSnippet.difficulty})
      </h3>
      <p>{selectedSnippet.description}</p>

      {/* Reference snippet (read‑only) */}
      <Editor
        height="200px"
        defaultLanguage={selectedSnippet.language || 'javascript'}
        value={selectedSnippet.code}
        options={{
          readOnly: true,
          fontFamily: 'JetBrains Mono, Fira Code, monospace',
          minimap: { enabled: false },
          lineNumbers: 'on',
          automaticLayout: true,
        }}
      />

      {/* Typing input */}
      <Editor
        height="200px"
        defaultLanguage={selectedSnippet.language || 'javascript'}
        value={userCode}
        onChange={(val) => setUserCode(val ?? '')}
        onMount={(editor) => (editorRef.current = editor)}
        options={{
          fontFamily: 'JetBrains Mono, Fira Code, monospace',
          cursorSmoothCaretAnimation: 'on',
          minimap: { enabled: false },
          automaticLayout: true,
          tabSize: 2,
          quickSuggestions: false,
          readOnly: done,               // lock editor after success
        }}
      />

      <p style={{ marginTop: '0.5rem' }}>
        Accuracy: {accuracy}% &nbsp;&nbsp;•&nbsp;&nbsp;WPM: {wpm}{' '}
        {done && '✓ Completed'}
      </p>
    </div>
  );
}

export default TypingChallengeMonaco;
