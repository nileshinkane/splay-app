import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import EditIcon from "@material-ui/icons/Edit";

const AdminControl = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Typography style={{ margin: "20px 0" }} align="center" variant="h4">
        Admin Functionalities
      </Typography>
      <Link style={{ textDecoration: "none" }} to="/addVideo">
        <Paper style={{ width: "100%", padding: "20px" }}>
          <Grid container spacing={3}>
            <Grid item container justify="flex-end" alignItems="center" xs={3}>
              <AddCircleOutlineOutlinedIcon />
            </Grid>
            <Grid
              item
              container
              justify="flex-start"
              alignItems="Center"
              xs={9}
            >
              <Typography variant="h5">Add Video</Typography>
            </Grid>
          </Grid>
        </Paper>

        <Paper style={{ width: "100%", padding: "20px", marginTop: "20px" }}>
          <Grid container spacing={3}>
            <Grid item container justify="flex-end" alignItems="center" xs={3}>
              <EditIcon />
            </Grid>
            <Grid
              item
              container
              justify="flex-start"
              alignItems="Center"
              xs={9}
            >
              <Typography variant="h5">Edit Video</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Link>
    </div>
  );
};

export default AdminControl;
