import React, { useState } from 'react';
import './App.css';

const symbols = ['C', 'L', 'O', 'W'];

function App() {
  const [credits, setCredits] = useState(10);
  const [slots, setSlots] = useState(['X', 'X', 'X']);
  const [spinning, setSpinning] = useState(false);

  const spinSlots = () => {
    if (credits <= 0 || spinning) return;

    setSpinning(true);
    setCredits(credits - 1);
    setSlots(['X', 'X', 'X']);

    // Simulate server request
    setTimeout(() => {
      const result = Array(3).fill().map(() => symbols[Math.floor(Math.random() * symbols.length)]);
      setSlots([result[0], 'X', 'X']);
      setTimeout(() => {
        setSlots([result[0], result[1], 'X']);
        setTimeout(() => {
          setSlots(result);
          setSpinning(false);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const cashOut = () => {
    // Cash out logic will go here
    alert(`You cashed out with ${credits} credits!`);
  };

  return (
    <div className="App">
      <h1>Casino Jackpot</h1>
      <div className="slot-machine">
        <div className="slot">{slots[0]}</div>
        <div className="slot">{slots[1]}</div>
        <div className="slot">{slots[2]}</div>
      </div>
      <div className="controls">
        <button onClick={spinSlots} disabled={spinning}>Spin</button>
        <button onClick={cashOut} disabled={spinning}>Cash Out</button>
      </div>
      <div className="credits">Credits: {credits}</div>
    </div>
  );
}

export default App;
