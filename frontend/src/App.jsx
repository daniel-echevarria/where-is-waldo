import { useState } from "react";
import "./App.css";
import wallyImg from "./assets/wally.jpg";
import CharacterSelection from "./components/CharacterSelection";

function App() {
  const targetingSquareSize = 30;
  const characters = ["wally", "running-shoes"];
  const [visible, setVisible] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const handleClick = (e) => {
    setCoordinates({ x: e.clientX, y: e.clientY });
    setVisible(visible ? false : true);
  };

  return (
    <>
      <CharacterSelection
        location={coordinates}
        targetingSquareSize={targetingSquareSize}
        visible={visible}
        characters={characters}
      />
      <img onClick={handleClick} src={wallyImg}></img>
    </>
  );
}

export default App;
