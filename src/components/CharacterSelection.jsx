import "./CharacterSelection.css";
import _ from "lodash";
import { useState } from "react";

const CharacterSelection = ({
  clickCoordinates,
  visible,
  characters,
  relativeCoord,
}) => {
  const circleDiameter = 30;
  const circleRadius = circleDiameter / 2;
  const xPos = clickCoordinates.x - circleRadius - 2;
  const yPos = clickCoordinates.y - circleRadius - 2;
  const display = visible ? "flex" : "none";

  const handleCharacterSelection = (e) => {
    const getSelectCharCoordinates = async () => {
      const response = await fetch("http://localhost:3000/personages");
      const personages = await response.json();
      const char = personages.find((perso) => perso.name === e.target.value);
      const answerIsCorrect =
        isInTargetRange(relativeCoord.x, char.xCoordinate) &&
        isInTargetRange(relativeCoord.y, char.yCoordinate);
      console.log(answerIsCorrect);
    };
    getSelectCharCoordinates();
  };

  const isInTargetRange = (value, target) => {
    const lowerRange = target - circleRadius;
    const upperRange = target + circleRadius;
    const range = _.range(lowerRange, upperRange);
    console.log(range);
    return range.includes(value);
  };

  const charList = characters.map((char) => {
    return (
      <button key={char} value={char} onClick={handleCharacterSelection}>
        {char}
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
