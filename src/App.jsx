import { useState } from "react";
import "./App.css";
import wallyImg from "./assets/wally.jpg";
import CharacterSelection from "./components/CharacterSelection";

function App() {
  const size = 30;
  const [visible, setVisible] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const handleClick = (e) => {
    setCoordinates({ x: e.clientX, y: e.clientY });
    setVisible(true);
  };

  return (
    <>
      <CharacterSelection
        location={coordinates}
        size={size}
        visible={visible}
      />
      <img onClick={handleClick} src={wallyImg}></img>
    </>
  );
}

export default App;
