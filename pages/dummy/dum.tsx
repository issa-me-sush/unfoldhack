import React, { useState } from "react";

const App = () => {
  const [isClosed, setIsClosed] = useState(true);

  const handleClick = () => {
    setIsClosed(!isClosed);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div
        className="envelope-container w-1/4 p-6 cursor-pointer"
        onClick={handleClick}>
        <div className="transition-transform transform hover:scale-110">
          {isClosed ? (
            <img src="/lib/envelope-closed.svg" alt="Closed Envelope" />
          ) : (
            <img src="/lib/envelope-open.svg" alt="Open Envelope" />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
