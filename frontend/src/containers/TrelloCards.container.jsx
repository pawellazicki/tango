import React, { useEffect } from "react";
import TrelloCard from "../components/TrelloCard.component";
import IconButton from "@material-ui/core/IconButton";
import "../styles/TrelloCard.css";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CreateCard from "../components/CreateCard.comopnent";
import {
  getCardsForList,
  createCard,
  deleteCard,
  updateLabels,
} from "../API/CardsAPI";
import CardView from "../components/cardView.component";
import { connectUserWithBoard } from "../API/UserBoardEnrollmentsAPI";

export default function TrelloCards({ listID }) {
  const [newCardDialogOpen, setNewCardDialogOpen] = React.useState(false);
  const [cardViewDialogOpen, setCardViewDialogOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [currentCard, setCurrentCard] = React.useState([]);

  const fetchCards = () => {
    return getCardsForList(listID, localStorage.getItem("token"));
  };

  const printCards = () => {
    return cards.map((card) => (
      <TrelloCard
        id={card.id}
        task={card.task}
        endDate={card.endDate}
        labels={card.label}
        onEdit={(id) => onCardEdit(id)}
        onDelete={(id) => onCardDelete(id)}
      />
    ));
  };

  const closeNewCardDialog = () => {
    setNewCardDialogOpen(false);
  };

  const closeCardViewDialog = () => {
    setCardViewDialogOpen(false);
  };

  const onCardEdit = (id) => {
    setCardViewDialogOpen(true);
    setCurrentCard(cards.filter((card) => card.id == id)[0]);
  };

  const saveCard = (card_id, colors) => {
    updateLabels(
      card_id,
      parseColors(colors),
      localStorage.getItem("token")
    ).then(() => {
      closeCardViewDialog();
      window.location.reload();
    });

    // connectUserWithBoard(5, 1, localStorage.getItem("token")).then(
    //   (response) => {
    //     console.log(response);
    //     setCardViewDialogOpen(false);
    //   }
    // );
  };

  const parseColors = (colors) => {
    let value = "";
    if (colors == null) return value;
    colors.forEach((color) => (value += color.key));
    return value;
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
    console.log(cards)
    if(cards.message == "")
      return
    return cards.map((card) => ({
      id: card.CardID,
      task: card.CardName,
      label: card.Label,
      endDate: new Date(card.Deadline).toLocaleDateString(),
    }));
  };

  useEffect(() => {
    fetchCards().then((response) => setCards(mapResponseToCard(response.data)));
  }, [cardViewDialogOpen]);

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

      <CardView
        isOpen={cardViewDialogOpen}
        cardObject={currentCard}
        handleClose={closeCardViewDialog}
        handleSave={saveCard}
      />
    </div>
  );
}
