import React from "react";
import "../styles/Board.component.css";
import BoardButtons from "../containers/BoardButtons.container";

function Board({ id, title, team, onDelete }) {
  const onDeleteBoards = () => {
    onDelete(id);
  };

  return (
    <div className="board">
      <h3>{title}</h3>
      <p>{team}</p>
      <BoardButtons onDelete={onDeleteBoards} />
    </div>
  );
}

export default Board;
