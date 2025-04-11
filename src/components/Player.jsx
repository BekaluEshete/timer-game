import React, { useState, useRef} from "react";
export default function Player() {
  const inputRef = useRef(null);
  const [player, setPlayer] = useState('');

  
  function handleSubmit () {
   setPlayer(inputRef.current.value);
   inputRef.current.value = '';


  }
  
  return (
    <section id="player">
      <h2>Welcome {player ?? " unknown entity"}</h2>
      <p>
        <input type="text" ref={inputRef}/>
        <button  onClick={handleSubmit}>Set Name</button>
      </p>
    </section>
  );
}
