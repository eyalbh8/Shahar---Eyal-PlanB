import React, { useState, useEffect } from 'react';
import './App.css';
import { initializeUser, spinAndGetCredits, cashOutCredits } from './ServerAPI';


function App() {
  // State variables to manage session ID, credits, slot symbols, spinning status, and cashout status
  const [sessionId, setSessionId] = useState(null);
  const [credits, setCredits] = useState(10);
  const [slots, setSlots] = useState(['X', 'X', 'X']);
  const [spinning, setSpinning] = useState([false, false, false]);
  const [cashedOut, setCashedOut] = useState(false);

  // Effect hook to initialize the user session on component mount
  useEffect(() => {
    const storedSessionId = localStorage.getItem('session_id');
    if (storedSessionId) {
      setSessionId(storedSessionId);
      initializeUser(storedSessionId).then(data => {
        setCredits(data.credits);
      }).catch(error => {
        console.error('Failed to initialize user:', error);
      });
    } else {
      const newSessionId = generateSessionId();
      localStorage.setItem('session_id', newSessionId);
      setSessionId(newSessionId);
      initializeUser(newSessionId).then(data => {
        setCredits(data.credits);
      }).catch(error => {
        console.error('Failed to initialize user:', error);
      });
    }
  }, []);

  // Function to generate a unique session ID
  const generateSessionId = () => {
    return 'session_' + Math.random().toString(36).substr(2, 9);
  };

  // Function to handle spinning the slots
  const spinSlots = async () => {
    if (credits <= 0 || spinning.some(spin => spin) || !sessionId) return;

    // Set spinning status and reset slots to 'X'
    setSpinning([true, true, true]);
    setSlots(['X', 'X', 'X']);

    try {
      const { slots: result, credits: newCredits } = await spinAndGetCredits(sessionId);
      // Set delays to simulate slot machine spinning
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

  // Function to handle cashing out
  const cashOut = async () => {
    if (!sessionId) return;

    try {
      const { credits: remainingCredits } = await cashOutCredits(sessionId);
      alert(`The session is over. You have left: ${remainingCredits} credits`);
      setCredits(remainingCredits);
      setCashedOut(true);
    } catch (error) {
      console.error('Failed to cash out:', error);
    }
  };

  // Function to handle restarting the game after cashing out
  const playMore = () => {
    setCashedOut(false);
    initializeUser(sessionId).then(data => {
      setCredits(data.credits);
    }).catch(error => {
      console.error('Failed to reinitialize user:', error);
    });
  };

  return (
    <div className="App">
      {cashedOut ? (
        // Display message screen when user has cashed out
        <div className="message-screen">
          <h1>See you next time!</h1>
          <button onClick={playMore}>Play More</button>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default App;
