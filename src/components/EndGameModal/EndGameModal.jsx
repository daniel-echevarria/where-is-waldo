import { useEffect, useState } from "react";
import CustomInput from "./CustomInput/CustomInput";
import "./EndGameModal.css";
import Podium from "./Podium/Podium";
import { differenceInSeconds } from "date-fns";
import apiUrl from "../../config";

const EndGameModal = ({ gameOver }) => {
  const [name, setName] = useState(null);
  const [topScores, setTopScores] = useState([]);
  const [didScoresUpdate, setDidScoresUpdate] = useState(false);
  const [timeScore, setTimeScore] = useState(null);
  const [currentPlayerScoreId, setCurrentPlayerScoreId] = useState(null);

  // Create the record (to start tracking time) when page loads
  useEffect(() => {
    const createScore = async () => {
      const scoreData = { name: "Player1" };
      const response = await fetch(`${apiUrl}/scores`, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scoreData),
      });

      const result = await response.json();
      setCurrentPlayerScoreId(result.id);
    };

    createScore();
  }, []);

  // Get the score (time) of the last player
  useEffect(() => {
    if (!gameOver) return;
    const getScore = async () => {
      const response = await fetch(`${apiUrl}/scores/${currentPlayerScoreId}`, {
        mode: "cors",
      });
      const result = await response.json();
      const startTime = new Date(result.created_at);
      const now = new Date();
      setTimeScore(differenceInSeconds(now, startTime));
    };
    getScore();
  }, [gameOver, currentPlayerScoreId]);

  // Update score record with the name and the score when the name changes
  useEffect(() => {
    if (!name) return;
    const updatePlayerName = async () => {
      const response = await fetch(`${apiUrl}/scores/${currentPlayerScoreId}`, {
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
  }, [currentPlayerScoreId, name, timeScore]);

  // Get Top Scores
  useEffect(() => {
    const getTopScores = async () => {
      const response = await fetch(`${apiUrl}/scores_top`, {
        mode: "cors",
      });
      const result = await response.json();
      setTopScores(result);
    };
    getTopScores();
  }, [didScoresUpdate]);

  const isInPodium = () => {
    const topTimes = topScores.map((top) => top.time_score);
    if (topTimes.length < 3) return true;
    return timeScore < topTimes[topTimes.length - 1];
  };

  return (
    <>
      {gameOver && (
        <div className="modal">
          <span>You found all characters in {timeScore} seconds! 💨</span>
          <Podium topScores={topScores} />
          {isInPodium() && !name && (
            <>
              <span>
                Congrats you are among the top 3 quickest waldo finders! <br />
                You may input your name for the grand podium!
              </span>
              <label>
                Name
                <CustomInput setName={setName} />
              </label>
            </>
          )}
          <button onClick={() => window.location.reload()}>Replay</button>
        </div>
      )}
    </>
  );
};

export default EndGameModal;
