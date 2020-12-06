import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import "../styles/TrelloList.css";
import { getLists } from "../API/ListsAPI";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "#333",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TrelloList({ boardId }) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [trelloLists, setTrelloLists] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (event, index) => {
    handleClickOpen();
    console.log(event, index);
    setSelectedIndex(index);
  };

  prepareListItems = () => {
    return trelloLists.map((list) => {
      <ListItem
        button
        onClick={(event) => handleListItemClick(event, 0)}
        selected={selectedIndex === 0}
      ></ListItem>;
    });
  };

  useEffect(() => {
    getLists(boardId, localStorage.getItem("token")).then((result) => {
      if (result.status == "200") {
        setTrelloLists(result.data.map((entry) => entry.ListName));
      }
    });
  }, []);

  return (
    <div>
      <List component="nav" aria-label="mailbox folders">
        <ListItem
          button
          onClick={(event) => handleListItemClick(event, 0)}
          selected={selectedIndex === 0}
        >
          <ListItemText primary="Inbox" />
        </ListItem>
      </List>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className="CustomButton"
              color="primary"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Sound
            </Typography>
            <Button
              className="CustomButton"
              autoFocus
              color="inherit"
              onClick={handleClose}
            >
              new
            </Button>
          </Toolbar>
        </AppBar>
      </Dialog>
    </div>
  );
}
