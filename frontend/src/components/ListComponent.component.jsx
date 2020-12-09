import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TrelloCards from "../containers/TrelloCards.container";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";

export default function ListComponent({ list, deleteTrelloList, updateTrelloList }) {
  const DELAY = 2000
  const [listTitle, setListTitle] = React.useState("")
  const [timeout, setTime] = useState(null)
  
  useEffect(() => {
    setListTitle(list.listName);
  }, [list.listName])

  const setTitle = (newTitle) => {
    setListTitle(newTitle)

    if(timeout)
      clearTimeout(timeout)
    
    setTime(setTimeout(() => {
      let newList = {
        listID: list.listID,
        listName: newTitle,
        boardID: list.boardID
      }
      updateTrelloList(newList)
    }, DELAY))
  }

  return (
    <div>
      <ListItem>
        <ListItemText>
          <input
            className="ListTitle"
            value={listTitle}
            onChange={event => setTitle(event.target.value)}
            type="text"/>
        </ListItemText>
        <ListItemSecondaryAction>
          <IconButton
            className="DeleteListButton"
            edge="end"
            aria-label="delete"
            onClick={() => deleteTrelloList(list.listID)}
          >
            <DeleteForeverIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <TrelloCards listID={list.listID} />
    </div>    
  )

}