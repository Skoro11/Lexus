
function NotFound() {
  return (
    
      <div>
        <div className="my-10 gap-5  md:my-35 max-w-[1170px] text-center flex flex-col mx-auto">
          <h1 className="text-xl md:text-6xl font-bold">404 Not Found</h1>
          <p className="mx-5 md:mx-0">Your visited page was not found. You may go to the Home page.</p>
          <a href="/">
            <button className="py-1 px-2 md:py-3 md:px-10 text-xl rounded bg-[#DB4444] text-white outline hover:opacity-50 pointer">Home</button>
          </a>
        </div>
      </div>
    
  );
}

export default NotFound;
