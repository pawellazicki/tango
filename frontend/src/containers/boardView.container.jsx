import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBoard, updateBoard } from "../API/BoardsAPI";
import BoardTitle from "../components/boardTitle.component";
import TrelloList from "../components/TrelloList.component";

export default function BoardView(props) {
  const [board, setBoard] = useState([]);
  const [loading, setLoading] = useState(true);
  const board_id = props.match.params.id;

  useEffect(() => {
    getBoard(board_id, localStorage.getItem("token")).then((result) => {
      if (result.status == "200") setBoard(result.data[0]);
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
      <BoardTitle boardTitle={board.TITLE} setBoardTitle={setBoardTitle} />
      <TrelloList boardId={board_id} />
    </div>
  );
}
