import React, { useState, useEffect } from "react";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import "../styles/TrelloCard.css";
import { editCard } from "../API/CardsAPI";
import { colourOptions } from "./ColorPicker.component";
import Chips from "./Chips.component";

export default function TrelloCard({
  id,
  task,
  endDate,
  labels,
  onDelete,
  onEdit,
}) {
  const DELAY = 2000;
  const [cardTitle, setcardTitle] = React.useState("");
  const [timeout, setTime] = useState(null);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    setColors(mapLabelsToColors());
    setcardTitle(task);
  }, [task]);

  const mapLabelsToColors = () => {
    if (labels == null) return;
    return Array.from(labels).map((elem) =>
      colourOptions.find((lookingFor) => lookingFor.key === elem)
    );
  };

  const setTitle = (newTitle) => {
    setcardTitle(newTitle);

    if (timeout) clearTimeout(timeout);

    setTime(
      setTimeout(() => {
        editCard(id, newTitle, localStorage.getItem("token"));
      }, DELAY)
    );
  };

  return (
    <div>
      <Card className="TrelloCard">
        <CardContent>
          <Chips colors={mapLabelsToColors()} />
          <Typography color="textSecondary" gutterBottom>
            <input
              className="CardTitle"
              value={cardTitle}
              onChange={(event) => setTitle(event.target.value)}
              type="text"
            />
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {endDate}
          </Typography>

          <div className="buttonsWrapper">
            <IconButton
              className="EditCardButton"
              aria-label="edit"
              onClick={() => onEdit(id)}
            >
              <EditRoundedIcon color="action" />
            </IconButton>

            <IconButton
              className="DeleteCardButton"
              aria-label="delete"
              onClick={() => onDelete(id)}
            >
              <DeleteForeverIcon color="action" />
            </IconButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
