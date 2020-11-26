import React, { useState, useEffect } from "react";
import Board from "../components/Board.component";
import Loading from "../components/Loading.component";
import "../styles/boards.container.css";
import { fetchBoards, createBoard, deleteBoard } from "../API/BoardsAPI";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, logUserOut } from "../action/userActions";
import { useSelector } from "react-redux";
import TitleWithButton from "../components/TitleWithButton.component";
import NewBoard from "../components/NewBoard.component";

export default function Boards() {
  const userReducer = useSelector((state) => state.userReducer);

  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addTab, setAddTab] = useState(false);
  const [newTabTitle, setNewTabTitle] = useState("");
  const [newTabTeam, setNewTabTeam] = useState("");

  const [dataLen, setDataLen] = useState(0);
  const [refreshDataLen, setRefreshDataLen] = useState(0);

  const handleResponse = async (response) => {
    if (response.statusCode === 401) {
      history.push("/login");
      dispatch(logUserOut());
    }
  };

  const printBoards = (boardsData) => {
    return boardsData.map((board) => (
      <Board
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
      setRefreshDataLen(dataLen - 1);
    });
  };

  const saveBoard = () => {
    createBoard(newTabTeam, newTabTeam, localStorage.getItem("token"));
    setRefreshDataLen(dataLen + 1);
    clearNewBoard();
  };

  const clearNewBoard = () =>{
    setAddTab(false);
    setNewTabTeam('');
    setNewTabTitle('');
  }

  useEffect(() => {
    fetchBoards(localStorage.getItem("token"))
      .then((result) => {
        handleResponse(result);
        setData(result.data);
        setRefreshDataLen(result.data.length);
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        dispatch(logUserOut());
        history.push("/login");
      });
  }, []);

  if(dataLen !== refreshDataLen){
    setDataLen(refreshDataLen);
    fetchBoards(localStorage.getItem("token")).then((result) => {
      handleResponse(result);
      setData(result.data);
      setRefreshDataLen(result.data.length);
    })
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
