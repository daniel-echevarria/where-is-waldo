import "./CharacterSelection.css";
import _ from "lodash";
import { useState, useEffect } from "react";

const CharacterSelection = ({
  clickCoordinates,
  visible,
  relativeCoord,
  setAnswer,
  placeMarker,
  characters,
}) => {
  useEffect(() => {
    const createScore = async () => {
      const scoreData = { name: "Player1" };

      const response = await fetch("http://localhost:3000/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scoreData),
      });

      const result = await response.json();
      console.log(result);
    };

    createScore();
  }, []);

  const circleDiameter = 30;
  const circleRadius = circleDiameter / 2;
  const xPos = clickCoordinates.x - circleRadius - 2;
  const yPos = clickCoordinates.y - circleRadius - 2;
  const display = visible ? "flex" : "none";

  const isInTargetRange = (value, target, errorMargin) => {
    const lowerRange = target - errorMargin;
    const upperRange = target + errorMargin;
    const range = _.range(lowerRange, upperRange);
    return range.includes(value);
  };

  const charIsInCircle = (relativeCoord, char) => {
    console.log(relativeCoord);
    console.log(char);
    return (
      isInTargetRange(relativeCoord.x, char.x, circleRadius) &&
      isInTargetRange(relativeCoord.y, char.y, circleRadius)
    );
  };

  const handleCharacterSelection = (e) => {
    const selectedChar = characters.find(
      (char) => char.name === e.target.value
    );
    const nailedIt = charIsInCircle(relativeCoord, selectedChar);
    nailedIt && placeMarker({ name: e.target.value, x: xPos, y: yPos });
    setAnswer(nailedIt ? "correct" : "wrong");
  };

  const charList = characters.map((char) => {
    return (
      <button
        key={char.name}
        value={char.name}
        onClick={handleCharacterSelection}
      >
        {char.name}
      </button>
    );
  });

  return (
    <div
      className="char-selection"
      style={{ display: display, top: yPos, left: xPos }}
    >
      <div
        className="targeting-square"
        style={{ width: circleDiameter, height: circleDiameter }}
      ></div>
      <div className="char-list">{charList}</div>
    </div>
  );
};

export default CharacterSelection;
