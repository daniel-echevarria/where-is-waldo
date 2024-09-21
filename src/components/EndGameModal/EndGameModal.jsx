import { useEffect, useState } from "react";
import CustomInput from "./CustomInput/CustomInput";
import "./EndGameModal.css";
import Podium from "./Podium/Podium";

const EndGameModal = ({ isOpen, timeScore, currentPlayerScoreId }) => {
  const [name, setName] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [topScores, setTopScores] = useState([]);
  const [saved, setSaved] = useState(false);
  const [didScoresUpdate, setDidScoresUpdate] = useState(false);

  // Update score record with the name and the score when the name changes
  useEffect(() => {
    if (!name) return;
    const updatePlayerName = async () => {
      const response = await fetch(
        `http://localhost:3000/scores/${currentPlayerScoreId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ name, time_score: timeScore }),
        }
      );
      const result = await response.json();
      setDidScoresUpdate(true);
    };
    updatePlayerName();
  }, [currentPlayerScoreId, name, timeScore]);

  // Get Top Scores
  useEffect(() => {
    const getTopScores = async () => {
      const response = await fetch("http://localhost:3000/scores_top");
      const result = await response.json();
      setTopScores(result);
    };
    getTopScores();
  }, [didScoresUpdate]);

  const handleChange = (e) => {
    setInputValue(e.target.inputValue);
  };

  const handleSaveName = () => {
    setName(inputValue);
    setSaved(true);
  };

  const isInPodium = () => {
    const topTimes = topScores.map((top) => top.time_score);
    if (topTimes.length < 3) return true;
    return timeScore < topTimes[topTimes.length - 1];
  };

  return (
    <>
      {isOpen && (
        <div className="modal">
          <span>You found all the characters in {timeScore} seconds! </span>
          <Podium topScores={topScores} />
          {isInPodium() && !saved && (
            <>
              <span>
                Congrats you are among the top 3 quickest waldo finders! <br />{" "}
                You may input your name for the grand podium!
              </span>
              <label>
                Name
                <CustomInput
                  handleChange={handleChange}
                  inputValue={inputValue}
                />
                <button onClick={handleSaveName}>Save</button>
              </label>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default EndGameModal;
