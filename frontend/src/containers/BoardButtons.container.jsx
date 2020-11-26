import React from "react";
import IconButton from "@material-ui/core/IconButton";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import "../styles/Board.component.css";

export default function BoardButtons({ onDelete, onEdit }) {
  return (
    <div className="ButtonsContainer">
      <IconButton className={"BoardButton"}>
        <EditRoundedIcon color="action" />
      </IconButton>

      <IconButton className={"BoardButton"} onClick={onDelete}>
        <DeleteForeverRoundedIcon color="action" />
      </IconButton>
    </div>
  );
}
