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
      const characterNames = await response.json();
      setCharacters(characterNames);
      setGameStarted(true);
    };
    getCharacters();
  }, []);

  if (!introOver) {
    return <IntroPage setIntroOver={setIntroOver} />;
  }
  return gameStarted ? (
    <GamePage characters={characters} setCharacters={setCharacters} />
  ) : (
    <LoadingPage />
  );
}

export default App;
