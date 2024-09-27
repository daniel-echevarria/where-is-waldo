const LoadingPage = () => {
  return (
    <div className="loading-page">
      <h3>Loading...</h3>
      <div className="ball"></div>
      <p>
        (Due to the limitations of my hosting provider's free tier, it may take
        up to 2 minutes for the app to load the first time... 🐌 Thank you for
        your patience!)
      </p>
    </div>
  );
};

export default LoadingPage;
