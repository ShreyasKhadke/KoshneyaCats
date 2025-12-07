import { useState, useEffect } from 'react'
import './App.css'
import meowSound from './assets/chepunMeow.mp3'
import Stopwatch from './components/Stopwatch'
import Countdown from './components/Countdown'
import CatDecoration from './components/CatDecoration'

function App() {
  /* Theme State */
  const [theme, setTheme] = useState('cream');

  /* Audio Helper */
  const playMeow = () => {
    const audio = new Audio(meowSound);
    audio.play().catch(e => console.log("Audio play failed:", e));
  };

  /* Theme Effect */
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="app-container">
      {/* Decorative Cats */}
      <CatDecoration setTheme={setTheme} playMeow={playMeow} />

      {/* Stopwatch Card */}
      <Stopwatch playMeow={playMeow} />

      {/* Countdown Card */}
      <Countdown playMeow={playMeow} />
    </div>
  )
}

export default App
