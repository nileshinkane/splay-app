import React, { useContext, useState, useEffect } from "react";
import SideComponent from "../_generic/SideComponent";
import CountUp from "react-countup";
import CustomSnackbar from "../_generic/Snackbar";
import { SnackbarContext } from "../../Contexts/SnackbarContext";
import { Grid, Paper, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const AdminPanel = (props) => {
  const classes = useStyles();
  const { snackbar } = useContext(SnackbarContext);
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/getVideosData`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setVideoData(data);
      });
  }, []);

  // const { admin, setAdmin } = useContext(AdminContext);

  return (
    <SideComponent>
      <Grid container spacing={3} style={{ marginTop: "25px", height: "30vh" }}>
        <Grid container item lg={8} md={8} xs={12}>
          <Paper
            className={classes.center}
            style={{ width: "100%", height: "100%", padding: "10px" }}
          >
            <Typography variant="h4">Welcome to Admin Dashboard !</Typography>
          </Paper>
        </Grid>
        <Grid container item lg={4} md={4} xs={12}>
          <Paper
            className={classes.center}
            style={{ width: "100%", flexDirection: "column" }}
          >
            <Typography variant="h6">Total videos on Website</Typography>
            <Typography style={{ fontWeight: "bold" }} variant="h4">
              <CountUp end={videoData && videoData.total} duration={4} />
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container style={{marginTop:'10px'}} spacing={2}>
        <Grid item sm={6} xs={12}>
          <Paper
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6">Cse/IT</Typography>
            <Typography style={{ fontWeight: "bold" }} variant="h4">
              <CountUp
                end={videoData === null ? 0 : videoData.data.cseit}
                duration={4}
              />
            </Typography>
          </Paper>
        </Grid>

        <Grid item sm={6} xs={12}>
          <Paper
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6">Electronics</Typography>
            <Typography style={{ fontWeight: "bold" }} variant="h4">
              <CountUp
                end={videoData === null ? 0 : videoData.data.undefined}
                duration={4}
              />
            </Typography>
          </Paper>
        </Grid>

        <Grid item sm={6} xs={12}>
          <Paper
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6">Electrical</Typography>
            <Typography style={{ fontWeight: "bold" }} variant="h4">
              <CountUp
                end={videoData === null ? 0 : videoData.data.elpo}
                duration={4}
              />
            </Typography>
          </Paper>
        </Grid>

        <Grid item sm={6} xs={12}>
          <Paper
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6">Mechanical</Typography>
            <Typography style={{ fontWeight: "bold" }} variant="h4">
              <CountUp
                end={videoData === null ? 0 : videoData.data.mech}
                duration={4}
              />
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {snackbar ? (
        <CustomSnackbar
          key={snackbar.date}
          variant="outlined"
          severity={snackbar.severity}
          message={snackbar.msg}
        />
      ) : (
        ""
      )}
    </SideComponent>
  );
};

export default AdminPanel;
