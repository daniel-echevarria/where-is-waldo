const MarkerList = ({ markers }) => {
  const markerList = markers.map((marker) => {
    return (
      <div
        key={marker.name}
        className="marker"
        style={{ top: marker.y, left: marker.x }}
      >
        <span>{"❎"}</span>
        <span className="marker-name">{marker.name}</span>
      </div>
    );
  });
  return <div className="markers">{markerList}</div>;
};

export default MarkerList;
