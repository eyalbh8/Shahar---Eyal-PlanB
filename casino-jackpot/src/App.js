import React, { useState } from 'react';
import './App.css';

const symbols = ['C', 'L', 'O', 'W'];

function App() {
  const [credits, setCredits] = useState(10);
  const [slots, setSlots] = useState(['X', 'X', 'X']);
  const [spinning, setSpinning] = useState([false, false, false]);

  const spinSlots = () => {
    if (credits <= 0 || spinning.some(spin => spin)) return;

    setCredits(credits - 1);
    setSpinning([true, true, true]);
    setSlots(['X', 'X', 'X']);

    const results = Array(3).fill().map(() => symbols[Math.floor(Math.random() * symbols.length)]);
    setTimeout(() => {
      setSpinning([false, true, true]);
      setSlots([results[0], 'X', 'X']);
    }, 2000);
    setTimeout(() => {
      setSpinning([false, false, true]);
      setSlots([results[0], results[1], 'X']);
    }, 3000);
    setTimeout(() => {
      setSpinning([false, false, false]);
      setSlots(results);
    }, 4000);
  };

  const cashOut = () => {
    alert(`You cashed out with ${credits} credits!`);
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
