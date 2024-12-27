import "./CharacterList.css";
const CharacterList = ({ charactersLeftToFind, handleCharacterSelection }) => {
  const charList = charactersLeftToFind.map((characterName) => {
    return (
      <button
        key={characterName}
        value={characterName}
        onClick={handleCharacterSelection}
      >
        {characterName}
      </button>
    );
  });
  return <div className="char-list">{charList}</div>;
};

export default CharacterList;
