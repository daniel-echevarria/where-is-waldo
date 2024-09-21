import { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import "./NameInputModal.css";
import Podium from "./Podium";

const NameInputModal = ({ isOpen, setName, timeScore }) => {
  const [value, setValue] = useState("");
  const [topScores, setTopScores] = useState([]);

  useEffect(() => {
    const getTopScores = async () => {
      const response = await fetch("http://localhost:3000/scores_top");
      const result = await response.json();
      setTopScores(result);
    };
    getTopScores();
  }, []);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSaveName = () => {
    setName(value);
  };

  const isInPodium = () => {
    const topTimes = topScores.map((top) => top.time_score);
    return timeScore < topTimes[topTimes.length - 1];
  };

  return (
    <>
      {isOpen && (
        <div className="modal">
          <span>You found all the characters in {timeScore} seconds! </span>
          <Podium topScores={topScores} />
          {isInPodium() && (
            <>
              <span>
                Congrats you are among the top 3 quickest waldo finders! <br />{" "}
                You may input your name for the grand podium!
              </span>
              <label>
                Name
                <CustomInput handleChange={handleChange} value={value} />
                <button onClick={handleSaveName}>Save</button>
              </label>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default NameInputModal;
