import { useEffect, useState } from "react";
import "./App.css";
import apiUrl from "./config";
import IntroPage from "./components/IntroPage/IntroPage";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import GamePage from "./components/GamePage/GamePage";

function App() {
  const [introOver, setIntroOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const getCharacters = async () => {
      const response = await fetch(`${apiUrl}/personages`, {
        mode: "cors",
      });
      const charactersObjects = await response.json();
      setCharacters(charactersObjects);
      setGameStarted(true);
    };
    getCharacters();
  }, []);

  if (!introOver) {
    return <IntroPage setIntroOver={setIntroOver} />;
  }
  return gameStarted ? (
    <GamePage setCharacters={setCharacters} characters={characters} />
  ) : (
    <LoadingPage />
  );
}

export default App;
