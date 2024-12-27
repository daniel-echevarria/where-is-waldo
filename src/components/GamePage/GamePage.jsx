import { useRef, useState, useEffect, useContext } from "react";
import wallyImg from "../../assets/wally.jpg";
import CharacterSelection from "./CharacterSelection/CharacterSelection";
import EndGameModal from "./EndGameModal/EndGameModal";
import AnswerFeedback from "./AnswerFeedback/AnswerFeedback";
import MarkerList from "./MarkerList/MarkerList";
import "./GamePage.css";
import Targets from "./Targets/Targets";
import { CharactersContext } from "../../App";

const GamePage = () => {
  const characters = useContext(CharactersContext);

  const [showCharSelection, setShowCharSelection] = useState(false);
  const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 });
  const [relativeCoord, setRelativeCoord] = useState({ x: 0, y: 0 });
  const [markers, setMarkers] = useState([]);
  const [answer, setAnswer] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const numCharacters = useRef(characters.length);

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
    setShowCharSelection(showCharSelection ? false : true);
    setAnswer(null);
  };

  const placeMarker = (marker) => {
    setMarkers([
      ...markers,
      {
        name: marker.name,
        x: marker.x + 8,
        y: marker.y + 8,
      },
    ]);
  };

  return (
    <main>
      <AnswerFeedback answer={answer} />
      <Targets />
      <CharacterSelection
        clickCoordinates={clickCoordinates}
        relativeCoord={relativeCoord}
        showCharSelection={showCharSelection}
        setShowCharSelection={setShowCharSelection}
        setAnswer={setAnswer}
        placeMarker={placeMarker}
        setGameOver={setGameOver}
      />
      <EndGameModal gameOver={gameOver} />
      <img onClick={handleClick} src={wallyImg} />
      <MarkerList markers={markers} />
    </main>
  );
};

export default GamePage;
