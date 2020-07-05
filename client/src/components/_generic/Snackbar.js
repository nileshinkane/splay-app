import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CustomSnackbar(props) {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  let smallScreen = window.innerWidth < 700;
  let position = smallScreen
    ? {
        vertical: "top",
        horizontal: "center",
      }
    : { vertical: "bottom", horizontal: "right" };

  if (props.msg === "") {
    return "";
  } else {
    return (
      <div>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={position}
        >
          <Alert onClose={handleClose} severity={props.severity}>
            {props.msg}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
