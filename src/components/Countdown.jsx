import { useState, useEffect } from 'react';
import { formatTime } from '../utils/formatTime';

const Countdown = ({ playMeow }) => {
    const [countdownTime, setCountdownTime] = useState(300); // Default 5 mins
    const [isCountdownRunning, setIsCountdownRunning] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isCountdownRunning && countdownTime > 0) {
            interval = setInterval(() => {
                setCountdownTime((prev) => prev > 0 ? prev - 1 : 0);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isCountdownRunning, countdownTime]);

    useEffect(() => {
        if (countdownTime === 0 && isCountdownRunning) {
            setIsCountdownRunning(false);
            playMeow();
        }
    }, [countdownTime, isCountdownRunning, playMeow]);

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

    return (
        <div className="timer-card">
            <h1>Countdown</h1>
            <div className="time-display">
                {formatTime(countdownTime)}
            </div>
            <div className="controls" style={{ marginBottom: '1rem' }}>
                <button className="btn btn-small" onClick={() => handleAddTime(1)}>+1m</button>
                <button className="btn btn-small" onClick={() => handleAddTime(5)}>+5m</button>
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
    );
};

export default Countdown;
