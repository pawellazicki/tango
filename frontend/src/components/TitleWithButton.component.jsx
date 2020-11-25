import React from 'react';
import '../styles/titleWithButton.component.css';

const TitleWithButton = ({addTab, setAddTab}) => {
    return (
      <div className="wrap">
        <h2 className="myBoards">My Boards</h2>
        <button 
          className="addTabButton" 
          onClick={() => setAddTab(!addTab)}>+
        </button>
      </div>
    );
}

export default TitleWithButton;