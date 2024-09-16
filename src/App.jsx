import { useState } from "react";
import "./App.css";
import wallyImg from "./assets/wally.jpg";
import CharacterSelection from "./components/CharacterSelection";

function App() {
  const targetingSquareSize = 30;
  const characters = ["wally", "running-shoes"];
  const [visible, setVisible] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const getCoordinates = async () => {
    const coordinates = await fetch("http://localhost:3000/personages");
    const someAnswer = await coordinates.json();
    console.log(someAnswer);
  };

  const handleClick = (e) => {
    setCoordinates({ x: e.clientX, y: e.clientY });
    setVisible(visible ? false : true);
    getCoordinates();
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
