import "./IntroPage.css";

const IntroPage = ({ setIntroOver }) => {
  return (
    <div className="intro">
      <h1>Where the Heck is Waldo ?</h1>
      <h2>Find the targets as fast as possible... good luck!</h2>
      <p>Can you make it to the grand podium ?</p>
      <button className="start-btn" onClick={() => setIntroOver(true)}>
        Start Game
      </button>
    </div>
  );
};

export default IntroPage;
