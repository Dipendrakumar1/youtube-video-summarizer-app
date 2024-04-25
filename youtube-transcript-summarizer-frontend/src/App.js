import './App.css';
import React from 'react';
import BackendAPI from './components/BackendApi';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>YouTube Transcript Summarizer</h1>
        <BackendAPI />
      </header>
    </div>
  );
}

export default App;
