import { useState, useEffect, useRef } from 'react'
import './App.css'
import creamCat from './assets/cream.png'
import neonCat from './assets/neon.png'
import greenCat from './assets/green.png'
import orangeCat from './assets/orange.png'
import pinkCat from './assets/pink.png'
import meowSound from './assets/chepunMeow.mp3'

function App() {
  /* Theme State */
  const [theme, setTheme] = useState('cream');

  /* Stopwatch State */
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  /* Countdown State */
  const [countdownTime, setCountdownTime] = useState(300); // Default 5 mins
  const [isCountdownRunning, setIsCountdownRunning] = useState(false);
  const countdownRef = useRef(null);

  /* Audio Helper */
  const playMeow = () => {
    const audio = new Audio(meowSound);
    audio.play().catch(e => console.log("Audio play failed:", e));
  };

  /* Theme Effect */
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  /* Stopwatch Logic */
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  /* Stopwatch Handlers */
  const handleStart = () => {
    setIsRunning(true);
    playMeow();
  };

  const handleStop = () => {
    setIsRunning(false);
    playMeow();
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    playMeow();
  };

  /* Countdown Logic */
  useEffect(() => {
    let interval = null;
    if (isCountdownRunning && countdownTime > 0) {
      interval = setInterval(() => {
        setCountdownTime((prev) => prev > 0 ? prev - 1 : 0);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCountdownRunning]);

  /* Handle Countdown End */
  useEffect(() => {
    if (countdownTime === 0 && isCountdownRunning) {
      setIsCountdownRunning(false);
      playMeow();
    }
  }, [countdownTime, isCountdownRunning]);

  const handleCountdownStart = () => {
    if (countdownTime > 0) {
      setIsCountdownRunning(true);
      playMeow();
    }
  };

  const handleCountdownStop = () => {
    setIsCountdownRunning(false);
    playMeow();
  };

  const handleCountdownReset = () => {
    setIsCountdownRunning(false);
    setCountdownTime(300); // Reset to 5 mins
    playMeow();
  };

  const handleAddTime = (minutes) => {
    setCountdownTime(prev => prev + minutes * 60);
    playMeow();
  };

  const formatTime = (seconds) => {
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return (
    <div className="app-container">
      {/* Decorative Cats - Click to change theme! */}
      <img
        src={creamCat} alt="Cream Cat" className="cat-decoration cat-1"
        onClick={() => { setTheme('cream'); playMeow(); }}
        title="Cream Theme"
      />
      <img
        src={neonCat} alt="Neon Cat" className="cat-decoration cat-2"
        onClick={() => { setTheme('neon'); playMeow(); }}
        title="Neon Theme"
      />
      <img
        src={greenCat} alt="Sage Cat" className="cat-decoration cat-3"
        onClick={() => { setTheme('sage'); playMeow(); }}
        title="Sage Theme"
      />
      <img
        src={orangeCat} alt="Orange Cat" className="cat-decoration cat-4"
        onClick={() => { setTheme('orange'); playMeow(); }}
        title="Orange Theme"
      />
      <img
        src={pinkCat} alt="Pink Cat" className="cat-decoration cat-5"
        onClick={() => { setTheme('rose'); playMeow(); }}
        title="Rose Theme"
      />

      {/* Stopwatch Card */}
      <div className="timer-card">
        <h1>Study Timer</h1>
        <div className="time-display">
          {formatTime(time)}
        </div>
        <div className="controls">
          {!isRunning ? (
            <button className="btn btn-start" onClick={handleStart}>
              {time > 0 ? "Resume" : "Start"}
            </button>
          ) : (
            <button className="btn btn-stop" onClick={handleStop}>Stop</button>
          )}
          <button className="btn btn-reset" onClick={handleReset}>Reset</button>
        </div>
      </div>

      {/* Countdown Card */}
      <div className="timer-card">
        <h1>Countdown</h1>
        <div className="time-display">
          {formatTime(countdownTime)}
        </div>
        <div className="controls" style={{ marginBottom: '1rem' }}>
          <button className="btn" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem', background: 'var(--primary)', color: 'var(--white)' }} onClick={() => handleAddTime(1)}>+1m</button>
          <button className="btn" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem', background: 'var(--primary)', color: 'var(--white)' }} onClick={() => handleAddTime(5)}>+5m</button>
        </div>
        <div className="controls">
          {!isCountdownRunning ? (
            <button className="btn btn-start" onClick={handleCountdownStart}>
              {countdownTime > 0 && countdownTime < 300 ? "Resume" : "Start"}
            </button>
          ) : (
            <button className="btn btn-stop" onClick={handleCountdownStop}>Stop</button>
          )}
          <button className="btn btn-reset" onClick={handleCountdownReset}>Reset</button>
        </div>
      </div>
    </div>
  )
}

export default App
