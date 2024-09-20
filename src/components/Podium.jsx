import { useEffect, useState } from "react";

const Podium = () => {
  const [topScores, setTopScores] = useState([]);
  useEffect(() => {
    const getTopScores = async () => {
      const response = await fetch("http://localhost:3000/scores_top");
      const result = await response.json();
      setTopScores(result);
    };
    getTopScores();
  }, []);

  const ScoreList = topScores.map((topScore) => {
    return (
      <div key={topScore.id} className="score-row">
        <span className="name">{topScore.name}</span>
        <span className="timeScore">{topScore.time_score}</span>
      </div>
    );
  });
  return <div className="podium">{ScoreList}</div>;
};

export default Podium;
