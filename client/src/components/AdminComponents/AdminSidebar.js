import React from "react";
import { NavLink } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import EditIcon from "@material-ui/icons/Edit";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

const linkStyles = {
  textDecoration: "none",
  color: "inherit",
  padding: 0,
};

const useStyles = makeStyles((theme) => ({
  hover: {
    marginBottom: "10px",
    borderRadius: "40px 0 0 40px",
    "&:hover": {
      backgroundColor: "rgba(255,255,255, 0.08)",
      borderRadius: "40px 0 0 40px",
      textDecoration: "none",
    },
  },
  active: {
    "& .MuiListItem-button": {
      backgroundColor: "rgba(255,255,255, 0.08)",
      borderRadius: "40px 0 0 40px",
      textDecoration: "none",
    },
  },
}));

const AdminSidebar = () => {
  const classes = useStyles();
  return (
    <div>
      <h3 style={{ color: "white", fontWeight: "400", textAlign: "center" }}>
        Admin Functionalities
      </h3>
      <List component="nav" aria-label="main mailbox folders">
        <NavLink
          activeClassName={classes.active}
          to="/adminPanel"
          style={linkStyles}
        >
          <ListItem className={classes.hover} button>
            <ListItemIcon>
              <SupervisorAccountIcon style={{ fontSize: "18px" }} />
            </ListItemIcon>
            <ListItemText primary="Admin Panel" />
          </ListItem>
        </NavLink>
        <NavLink
          activeClassName={classes.active}
          to="/addVideo"
          style={linkStyles}
        >
          <ListItem className={classes.hover} button>
            <ListItemIcon>
              <AddCircleOutlineOutlinedIcon style={{ fontSize: "18px" }} />
            </ListItemIcon>
            <ListItemText primary="Add Video" />
          </ListItem>
        </NavLink>

        <NavLink
          activeClassName={classes.active}
          to="/videoList"
          style={linkStyles}
        >
          <ListItem className={classes.hover} button>
            <ListItemIcon>
              <EditIcon style={{ fontSize: "18px" }} />
            </ListItemIcon>
            <ListItemText primary="Edit Video" />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );
};

export default AdminSidebar;
