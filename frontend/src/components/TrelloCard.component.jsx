import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import "../styles/TrelloCard.css";

export default function TrelloCard({ id, task, endDate, onDelete }) {
  return (
    <div>
      <Card className="TrelloCard">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {task}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {endDate}
          </Typography>
          <IconButton
            className="DeleteCardButton"
            aria-label="delete"
            onClick={() => onDelete(id)}
          >
            <DeleteForeverIcon color="action" />
          </IconButton>
        </CardContent>
      </Card>
    </div>
  );
}
