import React, { useState, useEffect } from "react";
import Board from "../components/Board.component";
import Loading from "../components/Loading.component";
import "../styles/boards.container.css";
import { fetchBoards, createBoard, deleteBoard, getBoard } from "../API/BoardsAPI";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, logUserOut } from "../action/userActions";
import { useSelector } from "react-redux";
import TitleWithButton from "../components/TitleWithButton.component";
import NewBoard from "../components/NewBoard.component";
import { getUserBoards } from "../API/UserBoardEnrollmentsAPI";

export default function Boards() {
  const userReducer = useSelector((state) => state.userReducer);

  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addTab, setAddTab] = useState(false);
  const [newTabTitle, setNewTabTitle] = useState("");
  const [newTabTeam, setNewTabTeam] = useState("");

  const handleResponse = async (response) => {
    if (response.statusCode === 401) {
      history.push("/login");
      dispatch(logUserOut());
    }
  };

  const printBoards = (boardsData) => {
    return boardsData.map((board) => (
      <Board
        key={board.ID}
        id={board.ID}
        title={board.TITLE}
        team={board.TEAM_NAME}
        onDelete={removeBoard}
      ></Board>
    ));
  };

  const removeBoard = (id) => {
    deleteBoard(id, localStorage.getItem("token")).then((result) => {
      const found = data.find((element) => element.ID === id);
      if(result.data.code === '200')
        refreshBoards();
    });
  };

  const saveBoard = () => {
    createBoard(newTabTitle, newTabTeam, localStorage.getItem("user_id"), localStorage.getItem("token"))
    .then((response) => {
      if(response.data.code === '200')
        refreshBoards();
    });
    clearNewBoard();
  };

  const clearNewBoard = () =>{
    setAddTab(false);
    setNewTabTeam('');
    setNewTabTitle('');
  }

  useEffect(() => {
    let boards = []
    getUserBoards(localStorage.getItem("user_id"), localStorage.getItem("token"))
      .then((result) => {
        result.data.map(enrollment => {
          getBoard(enrollment.BOARD_ID, localStorage.getItem("token")).then(result => {
            boards.push(result.data[0])
          })
        })
      })
      .then(() => {
        fetchBoards(localStorage.getItem("user_id"), localStorage.getItem("token"))
        .then(result => {
          result.data.map(board => boards.push(board))
          setData(boards);
        })
        setLoading(false);
      })
      .catch(() => {
        dispatch(logUserOut());
        history.push("/login");
      });
  }, []);
  
  const refreshBoards  = () => {
    fetchBoards(localStorage.getItem("user_id"), localStorage.getItem("token"))
      .then((result) => {
        handleResponse(result);
        setData(result.data);
      });    
  }

  return (
    <div className="tabs-container">
      <TitleWithButton addTab={addTab} setAddTab={setAddTab}></TitleWithButton>
      <div className="tabs">
        {loading ? <Loading /> : printBoards(data)}
        {addTab ? (
          <NewBoard
            newTabTitle={newTabTitle}
            setNewTabTitle={setNewTabTitle}
            newTabTeam={newTabTeam}
            setNewTabTeam={setNewTabTeam}
            setSaveNewTab={saveBoard}
          />
        ) : null}
      </div>
    </div>
  );
}
