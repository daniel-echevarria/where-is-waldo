import { useEffect, useState } from "react";
import "./App.css";
import apiUrl from "./config";
import IntroPage from "./components/IntroPage/IntroPage";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import GamePage from "./components/GamePage/GamePage";
import { createContext } from "react";

export const CharactersContext = createContext(null);

function App() {
  const [introOver, setIntroOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [charactersNames, setCharactersNames] = useState([]);

  useEffect(() => {
    const getCharactersNames = async () => {
      const response = await fetch(`${apiUrl}/personages`, {
        mode: "cors",
      });
      const characterNames = await response.json();
      setCharactersNames(characterNames);
      setGameStarted(true);
    };
    getCharactersNames();
  }, []);

  if (!introOver) {
    return <IntroPage setIntroOver={setIntroOver} />;
  }
  return gameStarted ? (
    <CharactersContext.Provider value={charactersNames}>
      <GamePage />
    </CharactersContext.Provider>
  ) : (
    <LoadingPage />
  );
}

export default App;
