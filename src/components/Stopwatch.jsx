import { useState, useEffect } from 'react';
import { formatTime } from '../utils/formatTime';

const Stopwatch = ({ playMeow }) => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

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

    return (
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
    );
};

export default Stopwatch;
