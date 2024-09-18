import { useEffect, useState } from "react";
import "./App.css";
import wallyImg from "./assets/wally.jpg";
import CharacterSelection from "./components/CharacterSelection";

function App() {
  const [characters, setCharacters] = useState([]);
  const [visible, setVisible] = useState(false);
  const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 });
  const [relativeCoord, setRelativeCoord] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const getPersonages = async () => {
      const response = await fetch("http://localhost:3000/personages");
      const personages = await response.json();
      const charactersNames = personages.map((perso) => perso.name);
      setCharacters(charactersNames);
    };
    getPersonages(), [];
  });

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const inImgX = e.clientX - rect.x;
    const inImgY = e.clientY - rect.y;
    const inImgCoordinates = { x: inImgX, y: inImgY };
    const clientCoordinates = { x: e.clientX, y: e.clientY };
    setClickCoordinates(clientCoordinates);
    setRelativeCoord(inImgCoordinates);
    setVisible(visible ? false : true);
  };

  return (
    <>
      <CharacterSelection
        clickCoordinates={clickCoordinates}
        relativeCoord={relativeCoord}
        visible={visible}
        characters={characters}
      />
      <img onClick={handleClick} src={wallyImg}></img>
    </>
  );
}

export default App;
