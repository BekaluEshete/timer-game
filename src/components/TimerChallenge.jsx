import { useState, useRef } from 'react';
import ResultDialog from './ResultDialog.jsx';

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const [isRunning, setIsRunning] = useState(false);

  function handleStart() {
    if (isRunning) return; // Prevent multiple starts
    setIsRunning(true);

    timer.current = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 10) {
          clearInterval(timer.current);
          timer.current = null;
          setIsRunning(false);
          dialog.current?.open();
          return 0;
        }
        return prevTime - 10;
      });
    }, 10);
  }

  function handleStop() {
    clearInterval(timer.current);
    timer.current = null;
    setIsRunning(false);
    dialog.current?.open(); // Open result dialog when stopped
  }

  function handleDialogClose() {
    setTimeRemaining(targetTime * 1000); // Reset time
    setIsRunning(false);
  }

  return (
    <>
      <ResultDialog
        ref={dialog}
        remainingTime={timeRemaining}
        targetTimer={targetTime}
        onClose={handleDialogClose}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {Math.ceil(timeRemaining / 1000)} Second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={isRunning ? handleStop : handleStart}>
            {isRunning ? 'Stop' : 'Start'}
          </button>
        </p>
        <p className={isRunning ? 'active' : undefined}>
          {isRunning ? 'Timer is running' : 'Timer is inactive'}
        </p>
      </section>
    </>
  );
}
