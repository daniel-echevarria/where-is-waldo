import { useEffect, useState } from "react";
import "./App.css";
import wallyImg from "./assets/wally.jpg";
import CharacterSelection from "./components/CharacterSelection";
import { differenceInSeconds } from "date-fns";
import NameInputModal from "./components/NameInputModal";
import AnswerFeedback from "./components/AnswerFeedback";

function App() {
  const [visible, setVisible] = useState(false);
  const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 });
  const [relativeCoord, setRelativeCoord] = useState({ x: 0, y: 0 });
  const [markers, setMarkers] = useState([]);
  const [answer, setAnswer] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [scoreId, setScoreId] = useState(null);
  const [name, setName] = useState(null);
  const [timeScore, setTimeScore] = useState(null);
  const [didScoresUpdate, setDidScoresUpdate] = useState(false);

  // Get Characters from Backend
  useEffect(() => {
    const getCharacters = async () => {
      const response = await fetch("http://localhost:3000/personages");
      const charactersObjects = await response.json();
      setCharacters(charactersObjects);
    };
    getCharacters();
  }, []);

  // Check for game over
  useEffect(() => {
    markers.length > 0 &&
      markers.length === characters.length &&
      setGameOver(true);
  }, [markers.length, characters.length]);

  // Get the score (time) of the last player
  useEffect(() => {
    if (!gameOver) return;
    const getScore = async () => {
      const response = await fetch(`http://localhost:3000/scores/${scoreId}`);
      const result = await response.json();
      const startTime = new Date(result.created_at);
      const now = new Date();
      setTimeScore(differenceInSeconds(now, startTime));
    };
    getScore();
  }, [gameOver, scoreId]);

  // Update The Score Record with the name and score
  useEffect(() => {
    if (!name) return;
    const updatePlayerName = async () => {
      const response = await fetch(`http://localhost:3000/scores/${scoreId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ name, time_score: timeScore }),
      });
      const result = await response.json();
      setDidScoresUpdate(true);
    };
    updatePlayerName();
  }, [scoreId, name, timeScore]);

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const inImgX = Math.round(e.clientX - rect.x);
    const inImgY = Math.round(e.clientY - rect.y);
    const inImgCoordinates = { x: inImgX, y: inImgY };
    const clientCoordinates = { x: e.clientX, y: e.clientY };
    setClickCoordinates(clientCoordinates);
    setRelativeCoord(inImgCoordinates);
    setVisible(visible ? false : true);
    setAnswer(null);
  };

  const markerList = markers.map((marker) => {
    return (
      <div
        key={marker.name}
        className="marker"
        style={{ top: marker.y, left: marker.x }}
      >
        <span>{"❎"}</span>
        <span className="marker-name">{marker.name}</span>
      </div>
    );
  });

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

  return (
    <main>
      <AnswerFeedback answer={answer} />
      <CharacterSelection
        clickCoordinates={clickCoordinates}
        relativeCoord={relativeCoord}
        visible={visible}
        setAnswer={setAnswer}
        placeMarker={placeMarker}
        characters={characters}
        gameOver={gameOver}
        setScoreId={setScoreId}
      />
      <NameInputModal
        isOpen={gameOver}
        setName={setName}
        timeScore={timeScore}
        didScoresUpdate={didScoresUpdate}
      />
      <img onClick={handleClick} src={wallyImg}></img>
      <div className="markers">{markerList}</div>
    </main>
  );
}

export default App;
