import React, { useState, useEffect } from 'react';
import './App.css';
import { spinAndGetCredits, cashOutCredits } from './ServerAPI';


function App() {
  const [sessionId, setSessionId] = useState(null); // Store session ID
  const [credits, setCredits] = useState(10);
  const [slots, setSlots] = useState(['X', 'X', 'X']);
  const [spinning, setSpinning] = useState([false, false, false]);

  useEffect(() => {
    // Generate or fetch a session ID when the component mounts
    const storedSessionId = localStorage.getItem('session_id');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = generateSessionId();
      localStorage.setItem('session_id', newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  const generateSessionId = () => {
    // Simple function to generate a random session ID
    return 'session_' + Math.random().toString(36).substr(2, 9);
  };

  const spinSlots = async () => {
    if (credits <= 0 || spinning.some(spin => spin) || !sessionId) return;

    setSpinning([true, true, true]);
    setSlots(['X', 'X', 'X']);

    try {
      const { slots: result, credits: newCredits } = await spinAndGetCredits(sessionId);
      setTimeout(() => {
        setSpinning([false, true, true]);
        setSlots([result[0], 'X', 'X']);
      }, 2000);
      setTimeout(() => {
        setSpinning([false, false, true]);
        setSlots([result[0], result[1], 'X']);
      }, 3000);
      setTimeout(() => {
        setSpinning([false, false, false]);
        setSlots(result);
        setCredits(newCredits);
      }, 4000);
    } catch (error) {
      console.error('Failed to spin slots:', error);
    }
  };

  const cashOut = async () => {
    if (!sessionId) return;

    try {
      await cashOutCredits(sessionId);
      alert(`You cashed out with ${credits} credits!`);
      setCredits(0);
    } catch (error) {
      console.error('Failed to cash out:', error);
    }
  };

  return (
    <div className="App">
      <h1>Casino Jackpot</h1>
      <div className="slot-machine">
        <div className={`slot ${spinning[0] ? 'spinning-slow' : ''}`}>{spinning[0] ? 'X' : slots[0]}</div>
        <div className={`slot ${spinning[1] ? 'spinning-medium' : ''}`}>{spinning[1] ? 'X' : slots[1]}</div>
        <div className={`slot ${spinning[2] ? 'spinning-fast' : ''}`}>{spinning[2] ? 'X' : slots[2]}</div>
      </div>
      <div className="controls">
        <button onClick={spinSlots} disabled={spinning.some(spin => spin)}>Spin</button>
        <button onClick={cashOut} disabled={spinning.some(spin => spin)}>Cash Out</button>
      </div>
      <div className="credits">Credits: {credits}</div>
    </div>
  );
}

export default App;
