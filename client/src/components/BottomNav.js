import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { NavLink } from "react-router-dom";
import customPalette from "../theme/colors";

import { UserContext } from "../Contexts/UserContext";

// import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    zIndex: "199",
    position: "fixed",
    // height: '40px',
    backgroundColor: "#252C48",
    bottom: "0",
    borderTop: "solid #252C48 1px",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  active: {
    textDecoration: "none",
    "& > button > span > svg": {
      transform: "translateY(-50%)",
      color: customPalette.primary.main,
    },
    "& > button > span > span": {
      "&.MuiBottomNavigationAction-label.MuiBottomNavigationAction-iconOnly": {
        opacity: 1,
        fontSize: "0.875rem",
        transform: "translateY(-60%)",
        color: customPalette.primary.main,
      },
    },
  },
}));

export default function BottomNav() {
  const classes = useStyles();

  const { user } = useContext(UserContext);
  let userType = user && user.user.type.toLowerCase() === "admin";

  return (
    <BottomNavigation className={classes.root}>
      <NavLink exact activeClassName={classes.active} to="/">
        <BottomNavigationAction label="Home" value="Home" icon={<HomeIcon />} />
      </NavLink>

      <NavLink exact activeClassName={classes.active} to="/search">
        <BottomNavigationAction
          label="Search"
          value="Search"
          icon={<SearchIcon />}
        />
      </NavLink>

      <NavLink exact activeClassName={classes.active} to="/departmentList">
        <BottomNavigationAction
          label="Departments"
          value="Departments"
          icon={<LibraryBooksIcon />}
        />
      </NavLink>
      <NavLink
        exact
        activeClassName={classes.active}
        to={
          userType === true
            ? "/adminControl"
            : user == null
            ? "/login"
            : `/user/${user.user._id}`
        }
      >
        <BottomNavigationAction
          label="User"
          value="User"
          icon={<AccountCircleIcon />}
        />
      </NavLink>
    </BottomNavigation>
  );
}
