import "./IntroPage.css";

const IntroPage = ({ setGameStarted }) => {
  return (
    <>
      <h2>Where the F*** is Waldo ?</h2>
      <button className="start-btn" onClick={() => setGameStarted(true)}>
        Start Game
      </button>
    </>
  );
};

export default IntroPage;
