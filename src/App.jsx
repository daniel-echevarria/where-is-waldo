import { useState } from "react";
import "./App.css";
import wallyImg from "./assets/wally.jpg";
import CharacterSelection from "./components/CharacterSelection";

function App() {
  const targetingSquareSize = 30;
  const characters = ["wally", "running-shoes"];
  const [visible, setVisible] = useState(false);
  const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 });

  const getPersonages = async () => {
    const response = await fetch("http://localhost:3000/personages");
    const personages = await response.json();
  };

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.x;
    const y = e.clientY - rect.y;
    const inImgCoordinates = { x: x, y: y };
    const clientCoordinates = { x: e.clientX, y: e.clientY };
    console.log(rect);
    console.log(inImgCoordinates);
    setClickCoordinates(clientCoordinates);
    setVisible(visible ? false : true);
    getPersonages();
  };

  return (
    <>
      <CharacterSelection
        location={clickCoordinates}
        targetingSquareSize={targetingSquareSize}
        visible={visible}
        characters={characters}
      />
      <img onClick={handleClick} src={wallyImg}></img>
    </>
  );
}

export default App;
