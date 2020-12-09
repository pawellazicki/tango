import React, { useState, useEffect } from "react";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import "../styles/TrelloCard.css";
import { editCard } from "../API/CardsAPI";

export default function TrelloCard({ id, task, endDate, onDelete }) {
  const DELAY = 2000
  const [cardTitle, setcardTitle] = React.useState("")
  const [timeout, setTime] = useState(null)
  
  useEffect(() => {
    setcardTitle(task);
  }, [task])

  const setTitle = (newTitle) => {
    setcardTitle(newTitle)

    if(timeout)
      clearTimeout(timeout)
    
    setTime(setTimeout(() => {
      editCard(id, newTitle, localStorage.getItem("token"))
    }, DELAY))
  }

  return (
    <div>
      <Card className="TrelloCard">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
          <input
            className="CardTitle"
            value={cardTitle}
            onChange={event => setTitle(event.target.value)}
            type="text"/>
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
