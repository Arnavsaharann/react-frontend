import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const logoUrl = "https://images.yourstory.com/cs/images/companies/logo-1586419574337.jpg?fm=auto&ar=1%3A1&mode=fill&fill=solid&fill-color=fff&format=auto&w=384&q=75";

  const handleLogoClick = () => {
    window.open("https://www.bridgelabz.com", "_blank");
  };

  const validateName = (name) => {

    if (name === '') {
    setError('');
    return true; // You can return false if you consider an empty name invalid for other purposes
    }
    if (name.length < 3) {
      setError('Name must be at least 3 characters long');
      return false;
    }
    if (name && name[0] !== name[0].toUpperCase()) {
      setError('Name must start with a capital letter');
      return false;
    }
    setError('');
    return true;
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setUserName(newName);
    validateName(newName);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello from BridgeLabz{userName && !error ? `, ${userName}` : ''}</h1>
        <input
          type="text"
          value={userName}
          onChange={handleNameChange}
          placeholder="Enter your name"
          className="input"
        />
        {error && <p className="error">{error}</p>}
        <img
          src={logoUrl}
          alt="BridgeLabz Logo"
          className="logo"
          onClick={handleLogoClick}
        />
        <p className="description">
          BridgeLabz is a tech community that empowers aspiring developers with hands-on training, mentorship, and job opportunities in software development. Join us to build your career in tech!
        </p>
        <Link to="/" className="link">Go to Home</Link>
      </header>
    </div>
  );
}

export default App;