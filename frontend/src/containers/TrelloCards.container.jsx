import React from "react";
import TrelloCard from "../components/TrelloCard.component";
import IconButton from "@material-ui/core/IconButton";
import "../styles/TrelloCard.css";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CreateCard from "../components/CreateCard.comopnent";

const cards = [
  {
    id: 1,
    task: "i dont know",
    endDate: "tomorrow",
  },
  {
    id: 2,
    task: "iidk",
    endDate: "tomorrow",
  },
  {
    id: 3,
    task: "webh",
    endDate: "tomorrow",
  },
];

export default function TrelloCards({ listID }) {
  const [newCardDialogOpen, setNewCardDialogOpen] = React.useState(false);

  const printCards = () => {
    return cards.map((card) => (
      <TrelloCard
        id={card.id}
        task={card.task}
        endDate={card.endDate}
        onDelete={() => onCardDelete(card.id)}
      />
    ));
  };

  const closeNewCardDialog = () => {
    setNewCardDialogOpen(false);
  };

  const onCardDelete = (id) => {
    console.log(id);
  };

  const onCardAdd = () => {
    setNewCardDialogOpen(true);
  };

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
      <CreateCard isOpen={newCardDialogOpen} handleClose={closeNewCardDialog} />
    </div>
  );
}
