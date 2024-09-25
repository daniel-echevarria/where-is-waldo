import "./IntroPage.css";

const IntroPage = ({ setGameStarted }) => {
  return (
    <div className="intro">
      <h1>Where the F*ck is Waldo ?</h1>
      <h2>find the targets as fast as possible... good luck!</h2>
      <p>can you make it to the grand podium ?</p>
      <button className="start-btn" onClick={() => setGameStarted(true)}>
        Start Game
      </button>
    </div>
  );
};

export default IntroPage;
