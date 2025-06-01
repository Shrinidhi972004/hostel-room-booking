import "../css/NotFound.css";

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="floating-elements">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>
      
      <div className="not-found-content">
        <h2>404</h2>
        <p className="not-found-subtitle">Page Not Found</p>
        <p className="not-found-description">
          The page you're looking for seems to have wandered off into the digital void.
        </p>
        <a href="/" className="back-home-btn">
          ← Back to Home
        </a>
      </div>
    </div>
  );
}
export default NotFound;