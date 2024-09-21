import { useEffect, useState } from "react";

const Podium = ({ topScores }) => {
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
