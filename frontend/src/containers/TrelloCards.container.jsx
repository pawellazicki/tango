import React, { useEffect } from "react";
import TrelloCard from "../components/TrelloCard.component";
import IconButton from "@material-ui/core/IconButton";
import "../styles/TrelloCard.css";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CreateCard from "../components/CreateCard.comopnent";
import { getCardsForList, createCard, deleteCard } from "../API/CardsAPI";

export default function TrelloCards({ listID }) {
  const [newCardDialogOpen, setNewCardDialogOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);

  const fetchCards = () => {
    return getCardsForList(listID, localStorage.getItem("token"));
  };

  const printCards = () => {
    return cards.map((card) => (
      <TrelloCard
        id={card.id}
        task={card.task}
        endDate={card.endDate}
        onDelete={(id) => onCardDelete(id)}
      />
    ));
  };

  const closeNewCardDialog = () => {
    setNewCardDialogOpen(false);
  };

  const onCardDelete = (id) => {
    deleteCard(id, localStorage.getItem("token")).then(() => {
      fetchCards().then((response) =>
        setCards(mapResponseToCard(response.data))
      );
    });
  };

  const onCardAdd = () => {
    setNewCardDialogOpen(true);
  };

  const addNewCard = (title, endDate) => {
    createCard(listID, title, endDate, localStorage.getItem("token")).then(() =>
      fetchCards().then((response) => {
        setCards(mapResponseToCard(response.data));
        setNewCardDialogOpen(false);
      })
    );
  };

  const mapResponseToCard = (cards) => {
    return cards.map((card) => ({
      id: card.CardID,
      task: card.CardName,
      endDate: new Date(card.Deadline).toLocaleDateString(),
    }));
  };

  useEffect(() => {
    fetchCards().then((response) => setCards(mapResponseToCard(response.data)));
  }, []);

  return (
    <div className="CardList">
      {printCards()}
      <IconButton
        className="AddCardButton"
        aria-label="add"
        onClick={onCardAdd}
      >
        <AddCircleIcon />
      </IconButton>
      <CreateCard
        isOpen={newCardDialogOpen}
        handleClose={closeNewCardDialog}
        handleAdd={addNewCard}
      />
    </div>
  );
}
