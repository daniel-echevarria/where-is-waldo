import { useEffect } from "react";

const Podium = () => {
  useEffect(() => {
    const getTopScores = async () => {
      const response = await fetch("http://localhost:3000/scores_top");
      const result = await response.json();
      console.log(result);
    };
    getTopScores();
  }, []);
  return <div className="podium"></div>;
};

export default Podium;
