import React, { useState, useRef,useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [markdown, setMarkdown] = useState('');
  // const [html, setHtml] = useState('');
  const previewRef = useRef(null);

  useEffect(() => {
    const convertMarkdown = async () => {
      const response = await axios.post('http://localhost:5000/convert', { text: markdown });
      
      if (previewRef.current) {
        console.log(previewRef.current)
        previewRef.current.innerHTML = response.data.html;
      }
    };

    if (markdown) {
      convertMarkdown();
      console.log(previewRef.current)
    } else if (previewRef.current) {
      previewRef.current.innerHTML = '';
    }
  }, [markdown]);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Real-time Markdown Editor</h1>
      </header>
      <div className="container">
        <textarea
          value={markdown}
          onChange={handleChange}
          placeholder="Enter Markdown text"
        />
        <div
          className="preview"
        ref={previewRef}
        />
      </div>
    </div>
  );
}

export default App;
