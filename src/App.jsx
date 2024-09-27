import { useRef, useEffect, useState } from "react";
import "./App.css";
import wallyImg from "./assets/wally.jpg";
import CharacterSelection from "./components/CharacterSelection/CharacterSelection";
import EndGameModal from "./components/EndGameModal/EndGameModal";
import AnswerFeedback from "./components/AnswerFeedback/AnswerFeedback";
import MarkerList from "./components/MarkerList/MarkerList";
import apiUrl from "./config";
import IntroPage from "./components/IntroPage/IntroPage";
import LoadingPage from "./components/LoadingPage/LoadingPage";

function App() {
  const [introOver, setIntroOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 });
  const [relativeCoord, setRelativeCoord] = useState({ x: 0, y: 0 });
  const [markers, setMarkers] = useState([]);
  const [answer, setAnswer] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [characters, setCharacters] = useState([]);

  const numCharacters = useRef(null);

  useEffect(() => {
    const getCharacters = async () => {
      const response = await fetch(`${apiUrl}/personages`, {
        mode: "cors",
      });
      const charactersObjects = await response.json();
      numCharacters.current = charactersObjects.length;
      setCharacters(charactersObjects);
      setGameStarted(true);
    };
    getCharacters();
  }, []);

  // Check if game is over
  useEffect(() => {
    markers.length > 0 &&
      markers.length === numCharacters.current &&
      setGameOver(true);
  }, [setGameOver, markers.length, characters.length]);

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const inImgX = Math.round(e.clientX - rect.x);
    const inImgY = Math.round(e.clientY - rect.y);
    setClickCoordinates({ x: e.pageX, y: e.pageY });
    setRelativeCoord({ x: inImgX, y: inImgY });
    setVisible(visible ? false : true);
    setAnswer(null);
  };

  const placeMarker = (marker) => {
    setMarkers([
      ...markers,
      {
        name: marker.name,
        x: marker.x,
        y: marker.y,
      },
    ]);
  };

  return introOver ? (
    gameStarted ? (
      <main>
        <AnswerFeedback answer={answer} />
        <CharacterSelection
          clickCoordinates={clickCoordinates}
          relativeCoord={relativeCoord}
          visible={visible}
          setVisible={setVisible}
          setAnswer={setAnswer}
          placeMarker={placeMarker}
          setGameOver={setGameOver}
          characters={characters}
          setCharacters={setCharacters}
        />
        <EndGameModal gameOver={gameOver} />
        <img onClick={handleClick} src={wallyImg} />
        <MarkerList markers={markers} />
      </main>
    ) : (
      <LoadingPage />
    )
  ) : (
    <IntroPage setIntroOver={setIntroOver} />
  );
}

export default App;
