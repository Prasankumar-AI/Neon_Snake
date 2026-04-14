import React, { useState } from 'react';
import './EntryScreen.css';

interface EntryScreenProps {
  onStart: (name: string, email: string) => void;
}

export const EntryScreen: React.FC<EntryScreenProps> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (val: string) => {
    const rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return rx.test(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name is required.');
      return;
    }
    if (!email) {
      setError('Email is required.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email.');
      return;
    }
    setError('');
    onStart(name, email);
  };

  return (
    <div className="entry-container">
      {/* Jungle Leaves Effect */}
      <div className="jungle-leaves-left">
        {[...Array(8)].map((_, i) => (
          <div key={`left-${i}`} className="leaf" style={{ animationDelay: `${Math.random() * 5}s`, left: `${Math.random() * 50}px` }}></div>
        ))}
      </div>
      <div className="jungle-leaves-right">
        {[...Array(8)].map((_, i) => (
          <div key={`right-${i}`} className="leaf" style={{ animationDelay: `${Math.random() * 5}s`, right: `${Math.random() * 50}px` }}></div>
        ))}
      </div>

      <h1 className="title neon-text-blue" style={{ zIndex: 10 }}>Neon Jungle</h1>
      
      <div className="snake-pit">
        <div className="snake-graphic side-snake-1"><div className="snake-body snake-pink"></div></div>
        <div className="snake-graphic main-snake"><div className="snake-body"></div></div>
        <div className="snake-graphic side-snake-2"><div className="snake-body snake-blue"></div></div>
      </div>

      <form className="input-group" onSubmit={handleSubmit} style={{ zIndex: 10 }}>
        <input
          type="text"
          className="email-input"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Your Name"
          required
        />
        <input
          type="email"
          className="email-input"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address for saving scores"
          required
        />
        <div className="error-text" aria-live="polite">{error}</div>
        <button 
          type="submit" 
          className="start-btn"
          disabled={!email || !name || (!!error && error !== 'Email is required.' && error !== 'Name is required.')}
          aria-label="Start Game"
        >
          Enter the Jungle
        </button>
      </form>
    </div>
  );
};
