import "./CharacterSelection.css";

const CharacterSelection = ({ location, size, visible }) => {
  const xPos = location.x - size / 2;
  const yPos = location.y - size / 2;

  const display = visible ? "flex" : "none";
  return (
    <div
      className="char-selection"
      style={{ display: display, top: yPos, left: xPos }}
    >
      <div
        className="targeting-square"
        style={{
          width: size,
          height: size,
        }}
      ></div>
      <div className="char-list"></div>
    </div>
  );
};

export default CharacterSelection;
