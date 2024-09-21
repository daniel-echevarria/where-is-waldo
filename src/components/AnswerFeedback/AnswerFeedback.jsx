import "./AnswerFeedback.css";

const AnswerFeedback = ({ answer }) => {
  return (
    <>
      {answer && (
        <div className="answer-box">
          <div className={answer}>{answer === "correct" ? "✅" : "❌"}</div>
        </div>
      )}
    </>
  );
};

export default AnswerFeedback;
