import React from 'react';
import Projects from './Components/projects';
import Introduction from './Components/introduction';
import './App.css';

function App() {
  return (
    <div>
      <section className="grid">
        <Introduction />
        <Projects />
      </section>
    </div>
  );
}

export default App;
