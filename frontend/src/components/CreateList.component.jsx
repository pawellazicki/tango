import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import "../styles/TrelloList.css";

export default function CreateList({ isOpen, handleClose, handleAddList }) {
  const [title, setTitle] = React.useState("");

  return (
    <div>
      <Dialog
        fullWidth={true}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create new list</DialogTitle>
        <DialogContent>
          <label className="createLabel">Name</label>
          <TextField
            margin="dense"
            id="timestamp"
            type="text"
            onChange={(newValue) => setTitle(newValue.target.value)}
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
            onClick={() => handleAddList(title)}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
