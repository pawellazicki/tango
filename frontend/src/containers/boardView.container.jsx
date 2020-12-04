import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBoard } from "../API/BoardsAPI";

export default function BoardView(props) {

  const [board, setBoard] = useState([]);
  const [loading, setLoading] = useState(true);
  const board_id = props.match.params.id;

    useEffect(() => {
      getBoard(board_id, localStorage.getItem("token")).then((result) => {
        console.log(result);
        if(result.status == '200')
          setBoard(result.data[0]);
      });
    }, []);

  return (
    <div>
      <label>Board title: {board.TITLE}</label>
    </div>
  )
}