import React from "react";
import IconButton from "@material-ui/core/IconButton";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import "../styles/Board.component.css";
import { Link } from "react-router-dom";

export default function BoardButtons({ onDelete, board_id, onEdit }) {
  return (
    <div className="ButtonsContainer">
      <IconButton className={"BoardButton"}>
        <Link to={`/board/${board_id}`}>
          <EditRoundedIcon color="action" />
        </Link>
      </IconButton>

      <IconButton className={"BoardButton"} onClick={onDelete}>
        <DeleteForeverRoundedIcon color="action" />
      </IconButton>
    </div>
  );
}
