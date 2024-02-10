import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

// This style doesn't reach to Pagination Item
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      selected: {
        backgroundColor: "transparent",
      },
    },
  })
);

export default function BasicPagination() {
  const classes = useStyles();
  return <Pagination count={10} className={classes.root} />;
}
