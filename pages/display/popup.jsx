import React from 'react';
import './popup.css'; // Import the CSS file for the popup component

const Popup = ({ number }) => {
  return (
    <div className="popup">
      <p>You have won {number} dollars</p>
    </div>
  );
};

export default Popup;