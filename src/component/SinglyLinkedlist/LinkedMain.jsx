import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SingleLinkListViewer from "./SinglyLinkListViewer";
import SinglyList from "./singlyLinkedListAlgo";
import AddInputButton from "./AddInputButton";
import Navbar from './Navbar/Navbar';
import { useSnackbar } from "notistack";

const singlyList = new SinglyList();

const useStyles = makeStyles({


  canvasContainer: {
    width: "100%",
    height: "78vh",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  controller: {
    width: "100%",
    height: "20%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: "4px",
  },
});

const SinglyLinkList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [number, setNumber] = useState(0);
  const [arr, setArr] = useState(singlyList.print());
  const classes = useStyles();

  const addElement = () => {
    if (arr.length < 14) {
      singlyList.push(number);
      setArr(singlyList.print());
    } else {
      enqueueSnackbar(
        "Sorry Cannot add Element because display will overload",
        {
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          variant: "error",
        }
      );
    }
  };

  const onDelete = () => {
    singlyList.pop();
    setArr(singlyList.print());
  };

  return (
    <div className={classes.root}>
      <Navbar />
      <h2 className={classes.header}>
        <hr style={{ width: "230px", border: "none", height: "1px", marginBottom: "150px" }} />
      </h2>
      <div className={classes.canvasContainer}>
        <SingleLinkListViewer heightInPercent={80} arr={arr} />
        <div className={classes.controller}>
          <AddInputButton num={number} setNum={setNumber} name="Insert" addElement={addElement} />
          <AddInputButton num={number} setNum={setNumber} name="Delete" onDelete={onDelete} />
        </div>
      </div>
    </div>
  );
};

export default SinglyLinkList;
