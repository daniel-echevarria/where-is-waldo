import { useContext, useRef } from "react";
import "./Targets.css";
import { CharactersContext } from "../../../App";

const Targets = () => {
  const characters = useContext(CharactersContext);
  const targets = useRef(characters);

  const targetBoxes = targets.current.map((target) => {
    return characters.includes(target) ? (
      <div key={target} className="target">
        {target}
      </div>
    ) : (
      <div key={target} className="target found">
        {target + " ✅"}
      </div>
    );
  });

  return (
    <>
      <div className="targets"> Targets: {targetBoxes}</div>
    </>
  );
};

export default Targets;
