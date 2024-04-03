import React from 'react';

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <button onClick={onClose}>Close</button>

        <p>This is a popup!</p>
      </div>
    </div>
  );
}

export default Popup