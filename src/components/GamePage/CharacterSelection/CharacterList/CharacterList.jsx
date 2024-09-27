import "./CharacterList.css";
const CharacterList = ({ characters, handleCharacterSelection }) => {
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
  return <div className="char-list">{charList}</div>;
};

export default CharacterList;
