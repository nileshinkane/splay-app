import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import cseit from "../../images/cseit.svg";
import electronics from "../../images/electronics.svg";
import electrical from "../../images/electrical.svg";
import mechanical from '../../images/mechanical.svg';
import ash from '../../images/ash.svg';


const useStyles = makeStyles(theme => ({
  imgBorder: {
    // border: "9px solid rgba(66,109,209,1)",
    borderRadius: "7px"
  },
  bannerRoot: {
    position: "relative",
    overflow: "hidden",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bannerImage: {
    objectFit: "cover",
    margin: 'auto',
    width: "80%",
    height: "auto",
    padding: "8px",
    borderRadius: "5px"
  },
  deptName: {
    fontFamily: "Playfair display",
    fontSize: "45px",
    padding: "0",
    margin: "0",
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    },
  }
}));

function DeptName(props) {
  const classes = useStyles();
  let param = props.match.params.deptName;
  const img = param === 'electronics' ? electronics : param === 'cseit' ?
    cseit : param === 'electrical' ?
      electrical : param === 'mechanical' ? mechanical : param === 'ash' ? ash : ''

  return (
    <React.Fragment>
      <div>
        <Grid container spacing={5}>
          <Grid alignItems="center" container item sm={5} xs={12} style={{ color: "white" }}>
            <div className={classes.imgBorder}>
              <div className={classes.bannerRoot}>
                <img src={img} className={classes.bannerImage} alt={`splay-${param}-department`} />
              </div>
            </div>
          </Grid>
          <Grid item sm={7} xs={12} style={{ color: "white" }}>
            <p className={classes.deptName}>
              {props.match.params.deptName.toUpperCase() === 'ASH' ? 'Applied Sciences & Humanities' : props.match.params.deptName.toUpperCase()}
            </p>
            <p
              style={{
                margin: "25px 15px 0px 0px",
                textAlign: "justify",
                fontSize: "17px"
              }}
            >
              {props.intro}
            </p>
          </Grid>
        </Grid>

      </div>
    </React.Fragment>
  );
}

export default DeptName;
