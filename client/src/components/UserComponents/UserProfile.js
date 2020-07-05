import React, { useState, useEffect, useContext } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { Paper, TextField, FormControl, Grid, Avatar } from "@material-ui/core";

import SideComponent from "../_generic/SideComponent";
import { UserContext } from "../../Contexts/UserContext";
import { Redirect } from "react-router-dom";

// const useStyles = makeStyles((theme) => ({}));

const UserProfile = (props) => {
  const [state, setState] = useState({});
  const { user } = useContext(UserContext);
  console.log(user);

  const handleChange = (name) => (e) => {
    setState({ ...state, [name]: e.target.value });
  };

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/user/${props.match.params.userId}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setState(data);
      });
  }, [props.match.params.userId]);

  const returnNameInitials = (name) => {
    let nameArr = name.split(" ");
    if (nameArr[0].toLowerCase() === "ku.") {
      return nameArr[1][0] + nameArr[3][0];
    } else {
      return nameArr[0][0] + nameArr[1][0];
    }
  };
  const isEmpty = (obj) => Object.keys(obj).length === 0;

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <SideComponent>
      <Paper style={{ padding: "20px 20px", marginTop: "20px" }}>
        <Grid container style={{ height: "auto" }}>
          <Grid
            container
            item
            justify="center"
            alignItems="center"
            lg={4}
            md={4}
            xs={12}
          >
            <Avatar
              style={{ height: "150px", width: "150px", fontSize: "50px" }}
            >
              {isEmpty(state) ? "" : returnNameInitials(state.Student_Name)}
            </Avatar>
          </Grid>

          <Grid
            container
            item
            justify="center"
            alignItems="center"
            spacing={2}
            style={{ padding: 10 }}
            lg={8}
            md={8}
            xs={12}
          >
            <Grid item xs={6}>
              <FormControl variant="outlined" style={{ width: "100%" }}>
                <TextField
                  label="Student Name"
                  value={state.Student_Name || ""}
                  onChange={handleChange("Student_Name")}
                  variant="outlined"
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl variant="outlined" style={{ width: "100%" }}>
                <TextField
                  label="Student Email"
                  value={state.Email || ""}
                  onChange={handleChange("Email")}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" style={{ width: "100%" }}>
                <TextField
                  label="Admission Number"
                  value={state.Admission_Number || ""}
                  onChange={handleChange("Admission_Number")}
                  disabled={true}
                  variant="outlined"
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </SideComponent>
  );
};

export default UserProfile;
