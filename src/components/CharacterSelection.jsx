import "./CharacterSelection.css";

const CharacterSelection = ({ location, size, visible }) => {
  const xPos = location.x - size / 2;
  const yPos = location.y - size / 2;

  const display = visible ? "block" : "none";
  return (
    <div className="char-selection">
      <div
        className="targeting-square"
        style={{
          top: yPos,
          left: xPos,
          width: size,
          height: size,
          display: display,
        }}
      ></div>
    </div>
  );
};

export default CharacterSelection;
