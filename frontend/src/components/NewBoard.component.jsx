import React, { useState, useEffect } from 'react';
import '../styles/Board.component.css';
import '../styles/newBoard.component.css';
import IconButton from "@material-ui/core/IconButton";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

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
            <IconButton className={"BoardButton"}
              onClick={() => setSaveNewTab(true)}>
              <EditRoundedIcon color="action" />
            </IconButton>
      </div>
  );
}

export default NewBoard;