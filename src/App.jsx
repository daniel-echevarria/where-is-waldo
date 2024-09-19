import { useEffect, useState } from "react";
import "./App.css";
import wallyImg from "./assets/wally.jpg";
import CharacterSelection from "./components/CharacterSelection";

function App() {
  const [visible, setVisible] = useState(false);
  const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 });
  const [relativeCoord, setRelativeCoord] = useState({ x: 0, y: 0 });
  const [answer, setAnswer] = useState(null);

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const inImgX = e.clientX - rect.x;
    const inImgY = e.clientY - rect.y;
    const inImgCoordinates = { x: inImgX, y: inImgY };
    const clientCoordinates = { x: e.clientX, y: e.clientY };
    setClickCoordinates(clientCoordinates);
    setRelativeCoord(inImgCoordinates);
    setVisible(visible ? false : true);
    setAnswer(null);
  };

  const Answer = () => {
    return <div className={answer}>{answer === "correct" ? "✅" : "❌"}</div>;
  };

  const answerBox = answer && visible ? <Answer /> : "";

  return (
    <>
      <div className="answer-box">{answerBox}</div>
      <CharacterSelection
        clickCoordinates={clickCoordinates}
        relativeCoord={relativeCoord}
        visible={visible}
        setAnswer={setAnswer}
      />
      <img onClick={handleClick} src={wallyImg}></img>
    </>
  );
}

export default App;
