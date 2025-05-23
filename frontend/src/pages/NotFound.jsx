
function NotFound() {
  return (
    
      <div>
        <div className="not-found mg-vertical-10 mx-width-1170px text-align-center flex direction-column space-between mg-inline-auto">
          <h1 className="font-48px">404 Not Found</h1>
          <p>Your visited page was not found. You may go to the Home page.</p>
          <a href="/">
            <button className="home-btn">Home</button>
          </a>
        </div>
      </div>
    
  );
}

export default NotFound;
