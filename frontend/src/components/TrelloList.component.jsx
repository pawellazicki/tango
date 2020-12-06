import React, { useEffect } from "react";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import "../styles/TrelloList.css";
import { getLists, deleteList, createList } from "../API/ListsAPI";
import Loading from "../components/Loading.component";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TrelloCards from "../containers/TrelloCards.container";
import CreateList from "../components/CreateList.component";

export default function TrelloList({ boardId }) {
  const [trelloLists, setTrelloLists] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isCreateListDialogOpen, setCreateListDialogOpen] = React.useState(
    false
  );

  const prepareListItems = () => {
    return trelloLists.map((list) => (
      <div>
        <ListItem>
          <ListItemText primary={list.listName} />
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
    ));
  };

  const closeCreateListDialog = () => {
    setCreateListDialogOpen(false);
  };

  const addNewList = (title) => {
    createList(title, boardId, localStorage.getItem("token")).then(
      fetchLists().then((response) => {
        setCreateListDialogOpen(false);
        setTrelloLists(mapResponseToList(response.data));
      })
    );
  };

  const deleteTrelloList = (id) => {
    deleteList(id, localStorage.getItem("token")).then(
      fetchLists().then((response) =>
        setTrelloLists(mapResponseToList(response.data))
      )
    );
  };

  const fetchLists = () => {
    return getLists(boardId, localStorage.getItem("token"));
  };

  const mapResponseToList = (response) => {
    return response.map((list) => ({
      listName: list.ListName,
      listID: list.ListID,
    }));
  };

  useEffect(() => {
    fetchLists().then((response) => {
      console.log(response);
      setLoading(false);
      setTrelloLists(mapResponseToList(response.data));
    });
  }, []);

  return (
    <div>
      <List component="nav">{loading ? <Loading /> : prepareListItems()}</List>
      <Button
        className="NewListButton"
        variant="contained"
        color="primary"
        onClick={() => setCreateListDialogOpen(true)}
      >
        New list
      </Button>
      <CreateList
        isOpen={isCreateListDialogOpen}
        handleAddList={addNewList}
        handleClose={closeCreateListDialog}
      />
    </div>
  );
}
