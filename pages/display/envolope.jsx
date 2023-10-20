import React, { useState } from 'react';
import './app.css';
import Popup from './Popup';

const App = ({ number }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`all_container ${isOpen ? 'open' : 'close'}`}>
      <div className="container" onClick={handleClick}>
        <div className="envelope"></div>
        <div className="flip"></div>
        <div className={`letter ${isOpen ? 'letterOpen' : 'letterClose'}`}>
          <div className="text"></div>
          {isOpen && <Popup number={number} />}
        </div>
      </div>
    </div>
  );
};

export default App;