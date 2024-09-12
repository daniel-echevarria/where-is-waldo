import { useState } from "react";
import "./App.css";
import wallyImg from "./assets/wally.jpg";

function App() {
  const handleClick = (e) => {
    console.log([e.clientX, e.clientY]);
  };
  return (
    <>
      <img onClick={handleClick} src={wallyImg}></img>
    </>
  );
}

export default App;
