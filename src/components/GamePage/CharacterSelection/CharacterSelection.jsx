import "./CharacterSelection.css";
import TargetingCircle from "./TargetingCircle/TargetingCircle";
import CharacterList from "./CharacterList/CharacterList";
import apiUrl from "../../../config";

const CharacterSelection = ({
  clickCoordinates,
  showCharSelection,
  setShowCharSelection,
  relativeCoord,
  setAnswer,
  placeMarker,
  characters,
  setCharacters,
}) => {
  const circleDiameter = 50;
  const circleRadius = circleDiameter / 2;
  const xPos = clickCoordinates.x - circleRadius - 2;
  const yPos = clickCoordinates.y - circleRadius - 2;
  const display = showCharSelection ? "flex" : "none";

  const compareCoordinates = async (characterName, selectedCoordinates) => {
    const requestOptions = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: characterName,
        coordinates: selectedCoordinates,
        circle_radius: circleRadius,
      }),
    };
    const response = await fetch(`${apiUrl}/personage_check`, requestOptions);
    const result = await response.json();
    return result;
  };

  const handleFoundChar = (charName) => {
    const filteredNames = characters.filter((char) => char != charName);
    setCharacters(filteredNames);
    placeMarker({ name: charName, x: xPos, y: yPos });
    setAnswer("correct");
  };

  const handleCharacterSelection = async (e) => {
    const charName = e.target.value;
    const foundChar = await compareCoordinates(charName, relativeCoord);
    foundChar ? handleFoundChar(charName) : setAnswer("wrong");
    setShowCharSelection(false);
  };

  return (
    <div
      className="char-selection"
      style={{ display: display, top: yPos, left: xPos }}
    >
      <TargetingCircle circleDiameter={circleDiameter} />
      <CharacterList
        charactersLeftToFind={characters}
        handleCharacterSelection={handleCharacterSelection}
      />
    </div>
  );
};

export default CharacterSelection;
