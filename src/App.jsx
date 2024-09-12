import { useState } from "react";
import "./App.css";
import wallyImg from "./assets/wally.jpg";
import CharacterSelection from "./components/CharacterSelection";

function App() {
  const [visible, setVisible] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const handleClick = (e) => {
    setCoordinates({ x: e.clientX, y: e.clientY });
    setVisible(true);
  };

  return (
    <>
      <img onClick={handleClick} src={wallyImg}></img>
      <CharacterSelection location={coordinates} size={30} visible={visible} />
    </>
  );
}

export default App;
