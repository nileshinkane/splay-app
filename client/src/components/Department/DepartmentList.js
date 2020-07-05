import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import PowerIcon from "@material-ui/icons/Power";
import Satellite from "@material-ui/icons/SatelliteOutlined";
import Computer from "@material-ui/icons/ComputerOutlined";
import BuildIcon from "@material-ui/icons/Build";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: "24px",
    color: "#fff",
  },
  link: {
    textDecoration: "none",
  },
}));

const DepartmentList = () => {
  const classes = useStyles();

  const departments = [
    {
      name: "Computer Sci and IT",
      icon: <Computer className={classes.icon} />,
      path: "/dept/cseit",
    },
    {
      name: "Electronics and Tele Comm",
      icon: <Satellite className={classes.icon} />,
      path: "/dept/electronics",
    },
    {
      name: "Electrical",
      icon: <PowerIcon className={classes.icon} />,
      path: "/dept/electrical",
    },
    {
      name: "Mechanical",
      icon: <BuildIcon className={classes.icon} />,
      path: "/dept/mechanical",
    },
    {
      name: "Applied Sci and Humanities",
      icon: <EmojiObjectsIcon className={classes.icon} />,
      path: "/dept/ash",
    },
  ];

  return (
    <div style={{ width: "100%", marginTop: "50px" }}>
      {departments.map((item, index) => (
        <div key={index}>
          <Link className={classes.link} to={item.path}>
            <Grid container style={{ padding: "20px 0" }}>
              <Grid item container justify="center" alignItems="center" xs={3}>
                {item.icon}
              </Grid>
              <Grid
                item
                container
                justify="flex-start"
                alignItems="center"
                xs={9}
              >
                <Typography variant="h5" noWrap>
                  {item.name}
                </Typography>
              </Grid>
            </Grid>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DepartmentList;
