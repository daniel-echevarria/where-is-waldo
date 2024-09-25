import "./IntroPage.css";

const IntroPage = ({ setIntroOver }) => {
  // Launch the server

  return (
    <div className="intro">
      <h1>Where the F*ck is Waldo ?</h1>
      <h2>find the targets as fast as possible... good luck!</h2>
      <p>can you make it to the grand podium ?</p>
      <button className="start-btn" onClick={() => setIntroOver(true)}>
        Start Game
      </button>
    </div>
  );
};

export default IntroPage;
