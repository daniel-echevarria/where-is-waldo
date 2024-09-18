import "./CharacterSelection.css";
import _ from "lodash";
import { useState, useEffect } from "react";

const CharacterSelection = ({ clickCoordinates, visible, relativeCoord }) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const getCharacters = async () => {
      const response = await fetch("http://localhost:3000/personages");
      const charactersObjects = await response.json();
      setCharacters(charactersObjects);
    };
    getCharacters();
  }, []);

  const circleDiameter = 30;
  const circleRadius = circleDiameter / 2;
  const xPos = clickCoordinates.x - circleRadius - 2;
  const yPos = clickCoordinates.y - circleRadius - 2;
  const display = visible ? "flex" : "none";

  const charactersNames = characters.map((char) => char.name);

  const isInTargetRange = (value, target, errorMargin) => {
    const lowerRange = target - errorMargin;
    const upperRange = target + errorMargin;
    const range = _.range(lowerRange, upperRange);
    return range.includes(value);
  };

  const charIsInCircle = (relativeCoord, char) => {
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
    e.target.className = nailedIt ? "correct" : "wrong";
  };

  const charList = charactersNames.map((char) => {
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
