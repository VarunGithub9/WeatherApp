import { useState } from 'react';
import './App.css';
import Weather from './components/Weather';

function App() {
  const [darkTheme, setDarkTheme] = useState(true);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <div className={`app ${darkTheme ? 'dark' : 'light'}`}>
      <Weather />
      <button onClick={toggleTheme} className="theme-toggle-btn">
        {darkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      </button>
    </div>
  );
}

export default App;
