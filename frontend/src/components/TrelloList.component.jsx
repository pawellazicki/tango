import React, { useEffect } from "react";
import List from "@material-ui/core/List";
import "../styles/TrelloList.css";
import { getLists, deleteList, createList, updateList } from "../API/ListsAPI";
import Loading from "../components/Loading.component";
import Button from "@material-ui/core/Button";
import CreateList from "../components/CreateList.component";
import ListComponent from "../components/ListComponent.component"

export default function TrelloList({ boardId }) {
  const [trelloLists, setTrelloLists] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isCreateListDialogOpen, setCreateListDialogOpen] = React.useState(
    false
  );

  const prepareListItems = () => {
    return trelloLists.map((list) => (
      <ListComponent list={list} deleteTrelloList={deleteTrelloList} updateTrelloList={updateTrelloList}></ListComponent>
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
  
  const updateTrelloList = (list) => {
    updateList(list.listID, list.listName,  localStorage.getItem("token"))
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
      setLoading(false);
      setTrelloLists(mapResponseToList(response.data));
    });
  }, [JSON.stringify(trelloLists)]);

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
