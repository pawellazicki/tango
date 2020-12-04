import React, { useState, useEffect } from "react";
import { fetchBoards } from "../API/BoardsAPI";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logUserOut } from "../action/userActions";

export default function BoardView(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [board, setBoard] = useState([]);
  const [loading, setLoading] = useState(true);
  const board_id = props.match.params.id;

    useEffect(() => {
      fetchBoards(localStorage.getItem("token"))
        .then((result) => {
          for(let i=0; i<result.data.length; i++){
            if(result.data[i].ID == board_id)
              setBoard(result.data[i]);
            
          }
        })
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          dispatch(logUserOut());
          history.push("/login");
        });
    }, []);

  return (
    <div>
      <label>Board title: {board.TITLE}</label>
    </div>
  )
}