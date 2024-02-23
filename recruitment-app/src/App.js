import React, { useState } from 'react';
import RecruitmentList from './components/RecruitmentList';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className="App-header">
        <div className="mode-switcher" onClick={toggleDarkMode}>
          <div className={`toggle ${darkMode ? 'toggle-dark' : 'toggle-light'}`} />
        </div>
        <RecruitmentList darkMode={darkMode} />
      </header>
    </div>
  );
}

export default App;
