import "./CharacterSelection.css";

const CharacterSelection = ({
  location,
  targetingSquareSize,
  visible,
  characters,
}) => {
  const xPos = location.x - targetingSquareSize / 2;
  const yPos = location.y - targetingSquareSize / 2;

  const display = visible ? "flex" : "none";
  const charList = characters.map((char) => {
    return <button key={char}>{char}</button>;
  });
  return (
    <div
      className="char-selection"
      style={{ display: display, top: yPos, left: xPos }}
    >
      <div
        className="targeting-square"
        style={{ width: targetingSquareSize, height: targetingSquareSize }}
      ></div>
      <div className="char-list">{charList}</div>
    </div>
  );
};

export default CharacterSelection;
