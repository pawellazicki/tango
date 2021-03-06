import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import "../styles/TrelloCard.css";

export default function CreateCard({ isOpen, handleClose, handleAdd }) {
  const [title, setTitle] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  return (
    <div>
      <Dialog
        fullWidth={true}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create new card</DialogTitle>
        <DialogContent>
          <label className="createLabel">Task</label>
          <TextField
            autoFocus
            margin="dense"
            id="task"
            type="text"
            onChange={(newValue) => setTitle(newValue.target.value)}
            fullWidth
          />
          <label className="createLabel">End date</label>
          <TextField
            margin="dense"
            id="timestamp"
            type="date"
            onChange={(newValue) => setEndDate(newValue.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            className="DialogButton"
            onClick={handleClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            className="DialogButton"
            onClick={() => handleAdd(title, endDate)}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
