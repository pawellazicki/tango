import React, { useState, useEffect } from "react";
import { connectUserWithBoard, getBoardUsers } from "../API/UserBoardEnrollmentsAPI";
import {getUsers} from "../action/userActions"
import '../styles/SideUsers.component.css';

const SideUsers = ({board_id}) => {
  const [addUserFlag, setAddUserFlag] = React.useState(false)
  const [boardUsers, setBoardUsers] = React.useState([])
  const [allUsers, setAllUsers] = React.useState([])
  
  React.useEffect(() => {
    getBoardUsers(board_id, localStorage.getItem("token")).then((response) => {
      setBoardUsers(response.data);
    })
    getUsers(localStorage.getItem("token")).then((response) => {
      setAllUsers(response.data)
    })
  }, [JSON.stringify(boardUsers)]);

  const addUser = (user_id) => {
    let found = false;
    boardUsers.map(boardUser => {
      if(boardUser.id === user_id)
        found = true
    })
    if(!found) {
      connectUserWithBoard(user_id, board_id, localStorage.getItem("token"));
      setAddUserFlag(false)
    }
  }

    return (
      <div>
        <div className="userContainer">
          {boardUsers ? boardUsers.map(user => (
            <p className="userName">{user.username}</p>
          ))
        : null}
          
        </div>
        <button className="addUser" onClick={() => setAddUserFlag(!addUserFlag)}>Add user</button>

        {addUserFlag ?
          <div className="allUsers">
            {allUsers? allUsers.map(user => (
            <p className="userNameAllUsers" onClick={() => addUser(user.id)}>{user.username}</p>
            ))
          : null}
          </div>
        : null
        }
      </div>
    );
}

export default SideUsers;