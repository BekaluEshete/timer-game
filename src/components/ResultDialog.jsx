import { useImperativeHandle, useRef } from "react";

export default function ResultDialog({ ref: dialogRef, targetTimer, remainingTime, onClose }) {
  const dialog = useRef();
  const userLost = remainingTime <= 0;
  const timeLeft = (remainingTime / 1000).toFixed(2);
  const score = userLost ? 0 : (timeLeft / targetTimer).toFixed(2);

  useImperativeHandle(dialogRef, () => ({
    open() {
      dialog.current?.showModal();
    },
  }));

  function handleClose() {
    dialog.current?.close();
    onClose(); // Reset timer after closing dialog
  }

  return (
    <dialog className="result-modal" ref={dialog}>
      <p>You {userLost ? "lost" : "won"}!</p>
      <p>Target time was <strong>{targetTimer}</strong> seconds</p>
      <p>You stopped the timer with <strong>{timeLeft}</strong> seconds left</p>
      <p>Your score: <strong>{score}</strong></p>
      <form method="dialog" onClose={handleClose}>
        <button onClick={handleClose}>Close</button>
      </form>
    </dialog>
  );
}
