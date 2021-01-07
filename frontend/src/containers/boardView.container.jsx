import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBoard, updateBoard } from "../API/BoardsAPI";
import BoardTitle from "../components/boardTitle.component";
import TrelloList from "../components/TrelloList.component";
import "../styles/boardView.css";
import SideUsers from "../components/SideUsers.component";
import { connectUserWithBoard, getUserBoards } from "../API/UserBoardEnrollmentsAPI";

export default function BoardView(props) {
  const [board, setBoard] = useState([]);
  const [loading, setLoading] = useState(true);
  const board_id = props.match.params.id;

  useEffect(() => {
    let boardUser_id = 0
    getBoard(board_id, localStorage.getItem("token")).then((result) => {
      if (result.status == "200") {
        setBoard(result.data[0]);
        boardUser_id = result.data[0].USER_ID
      }
    }).then( () => {
      getUserBoards(localStorage.getItem("user_id"), localStorage.getItem("token"))
        .then((result) => {
        let found = false
        result.data.map(enrollment => {
          if(enrollment.BOARD_ID == board_id) {
            console.log(enrollment)
            found = true
          }
        })
        
        if(localStorage.getItem("user_id") != boardUser_id && !found) {
          connectUserWithBoard(
            localStorage.getItem("user_id"), 
            board_id,
            localStorage.getItem("token")).then(console.log("aaa"));
          }
      })
    });
  }, []);

  const setBoardTitle = (title) => {
    setBoard({ TITLE: title });
    updateTitle(title);
  };

  const updateTitle = (title) => {
    updateBoard(
      board.ID,
      title,
      board.TEAM_NAME,
      localStorage.getItem("token")
    ).then((result) => {
      if (result.data.code === "200") console.log("updated");
    });
  };

  return (
    <div>
      <div className="mainViewWrapper">
        <div className="listsWrapper">
          <BoardTitle boardTitle={board.TITLE} setBoardTitle={setBoardTitle} />
          <TrelloList boardId={board_id} />
        </div>
        <div className="usersWrapper">
          <SideUsers board_id={board_id}/>
        </div>
      </div>
    </div>
  );
}
