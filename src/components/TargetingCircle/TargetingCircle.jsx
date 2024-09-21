const TargetingCircle = ({ circleDiameter }) => {
  return (
    <div
      className="targeting-square"
      style={{ width: circleDiameter, height: circleDiameter }}
    ></div>
  );
};

export default TargetingCircle;
