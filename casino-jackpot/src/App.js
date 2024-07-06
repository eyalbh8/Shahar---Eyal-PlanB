import React, { useState, useEffect } from 'react';
import './App.css';

const symbols = ['C', 'L', 'O', 'W'];

function App() {
  const [credits, setCredits] = useState(10);
  const [slots, setSlots] = useState(['X', 'X', 'X']);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    let timeout1, timeout2, timeout3;
    if (spinning) {
      const result = Array(3).fill().map(() => symbols[Math.floor(Math.random() * symbols.length)]);
      timeout1 = setTimeout(() => {
        setSlots([result[0], 'X', 'X']);
        timeout2 = setTimeout(() => {
          setSlots([result[0], result[1], 'X']);
          timeout3 = setTimeout(() => {
            setSlots(result);
            setSpinning(false);
          }, 1000);
        }, 1000);
      }, 1000);
    }
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [spinning]);

  const spinSlots = () => {
    if (credits <= 0 || spinning) return;

    setSpinning(true);
    setCredits(credits - 1);
    setSlots(['X', 'X', 'X']);
  };

  const cashOut = () => {
    // Cash out logic will go here
    alert(`You cashed out with ${credits} credits!`);
  };

  return (
    <div className="App">
      <h1>Casino Jackpot</h1>
      <div className="slot-machine">
        <div className={`slot ${spinning ? 'spinning' : ''}`}>{slots[0]}</div>
        <div className={`slot ${spinning ? 'spinning' : ''}`}>{slots[1]}</div>
        <div className={`slot ${spinning ? 'spinning' : ''}`}>{slots[2]}</div>
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
