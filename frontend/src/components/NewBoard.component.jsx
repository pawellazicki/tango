import React, { useState, useEffect } from 'react';
import '../styles/Board.component.css';
import '../styles/newBoard.component.css';

const NewBoard = ({newTabTitle, setNewTabTitle, newTabTeam, setNewTabTeam, setSaveNewTab}) => {
  
  return (
      <div className="board">
          <input 
            className="inputTitle"
            value={newTabTitle}
            onChange={event => setNewTabTitle(event.target.value)}
            placeholder={"Board Title"}
            type="text"/>
          <input 
            className="inputTeam"
            value={newTabTeam}
            onChange={event => setNewTabTeam(event.target.value)}
            placeholder={"Team name"}
            type="text"/>
            <button
              className="buttonSaveBoard"
              onClick={() => setSaveNewTab(true)}
              >Save
            </button>
      </div>
  );
}

export default NewBoard;