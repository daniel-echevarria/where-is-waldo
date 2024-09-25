import "./CharacterSelection.css";
import _ from "lodash";
import { useState, useEffect } from "react";
import TargetingCircle from "./TargetingCircle/TargetingCircle";
import CharacterList from "./CharacterList/CharacterList";
import apiUrl from "../../config";

const CharacterSelection = ({
  clickCoordinates,
  visible,
  setVisible,
  relativeCoord,
  setAnswer,
  placeMarker,
  markersLength,
  setGameOver,
}) => {
  const [characters, setCharacters] = useState([]);

  // Get Characters from Backend
  useEffect(() => {
    const getCharacters = async () => {
      const response = await fetch(`${apiUrl}/personages`, {
        mode: "cors",
      });
      const charactersObjects = await response.json();
      setCharacters(charactersObjects);
    };
    getCharacters();
  }, []);

  // Check if game is over
  useEffect(() => {
    markersLength > 0 &&
      markersLength === characters.length &&
      setGameOver(true);
  }, [setGameOver, markersLength, characters.length]);

  const circleDiameter = 50;
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
    setVisible(false);
  };

  return (
    <div
      className="char-selection"
      style={{ display: display, top: yPos, left: xPos }}
    >
      <TargetingCircle circleDiameter={circleDiameter} />
      <CharacterList
        characters={characters}
        handleCharacterSelection={handleCharacterSelection}
      />
    </div>
  );
};

export default CharacterSelection;
