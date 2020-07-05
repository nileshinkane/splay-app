import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import cseit from "../../images/cseit.svg";
import electronics from "../../images/electronics.svg";
import electrical from "../../images/electrical.svg";
import mechanical from "../../images/mechanical.svg";
import ash from "../../images/ash.svg";

const useStyles = makeStyles((theme) => ({
  imgBorder: {
    // border: "9px solid rgba(66,109,209,1)",
    borderRadius: "7px",
  },
  bannerRoot: {
    position: "relative",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bannerImage: {
    objectFit: "contain",
    margin: "auto",
    width: "100%",
    height: "250px",
    padding: "8px",
    borderRadius: "5px",
  },
  deptName: {
    fontFamily: "Playfair display",
    fontSize: "45px",
    textAlign: "center",
    padding: "0",
    margin: "0",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
}));

function DeptName(props) {
  const classes = useStyles();
  let param = props.match.params.deptName;
  const img =
    param === "electronics"
      ? electronics
      : param === "cseit"
      ? cseit
      : param === "electrical"
      ? electrical
      : param === "mechanical"
      ? mechanical
      : param === "ash"
      ? ash
      : "";

  const printName = () => {
    if (props.match.params.deptName === "cseit")
      return "Computer Sciences and Information Technology";
    else if (props.match.params.deptName === "electronics")
      return "Electronics and Telecommunication";
    else if (props.match.params.deptName === "electrical")
      return "Electrical, Electronics and Power";
    else if (props.match.params.deptName === "mechanical") return "Mechanical";
    else if (props.match.params.deptName === "ash")
      return "Applied Sciences and Humanities";
    else return "Misc";
  };

  return (
    <React.Fragment>
      <div>
        <Grid container spacing={5}>
          <Grid
            container
            item
            sm={5}
            xs={12}
            justify="center"
            alignItems="center"
          >
            <div className={classes.imgBorder}>
              <div className={classes.bannerRoot}>
                <img
                  src={img}
                  className={classes.bannerImage}
                  alt={`splay-${param}-department`}
                />
              </div>
            </div>
          </Grid>
          <Grid
            alignItems="center"
            justify="center"
            container
            item
            sm={7}
            xs={12}
            style={{ color: "white" }}
          >
            <p className={classes.deptName}>
              {/* {props.match.params.deptName.toUpperCase() === 'ASH' ? 'Applied Sciences & Humanities' : props.match.params.deptName.toUpperCase()} */}
              {printName()}
            </p>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default DeptName;
