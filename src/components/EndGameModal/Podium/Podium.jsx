import { useEffect, useState } from "react";
import "./Podium.css";

const Podium = ({ topScores }) => {
  const colors = ["gold", "silver", "bronze"];

  const ScoreList = topScores.map((topScore, index) => {
    return (
      <div key={topScore.id} className={`score-row ${colors[index]} `}>
        <span>{index + 1}.</span>
        <span className="name">{topScore.name}</span>
        <span className="timeScore">{topScore.time_score}s</span>
      </div>
    );
  });
  return (
    <div className="podium">
      <span>FASTEST WALDOERS</span>
      {ScoreList}
    </div>
  );
};

export default Podium;
