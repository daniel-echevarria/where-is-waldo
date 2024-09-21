import "./TargetingCircle.css";

const TargetingCircle = ({ circleDiameter }) => {
  return (
    <div
      className="targeting-circle"
      style={{ width: circleDiameter, height: circleDiameter }}
    ></div>
  );
};

export default TargetingCircle;
