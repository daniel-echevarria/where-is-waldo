import "./CharacterList.css";
import { CharactersContext } from "../../../../App";
import { useContext } from "react";
const CharacterList = ({ handleCharacterSelection }) => {
  const characters = useContext(CharactersContext);
  const charList = characters.map((characterName) => {
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
