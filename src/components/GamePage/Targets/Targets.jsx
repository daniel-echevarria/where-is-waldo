import { useRef } from "react";
import "./Targets.css";

const Targets = ({ characters }) => {
  const targets = useRef(characters);

  const targetBoxes = targets.current.map((target) => {
    return characters.includes(target) ? (
      <div key={target.name} className="target">
        {target.name}
      </div>
    ) : (
      <div key={target.name} className="target found">
        {target.name + " ✅"}
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
