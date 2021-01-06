import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function Chips({ colors }) {
  const classes = useStyles();

  const printColors = () => {
    if (colors === undefined) return;
    return colors.map((color) => (
      <Chip
        style={{ backgroundColor: color.color, width: "50px" }}
        styevariant="outlined"
        size="small"
      />
    ));
  };

  return <div className={classes.root}> {printColors()}</div>;
}
