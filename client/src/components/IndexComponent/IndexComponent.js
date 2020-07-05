import React, { useEffect, useState } from "react";
import SideComponent from "../_generic/SideComponent";
import { makeStyles } from "@material-ui/core/styles";
// import Banner from '../_generic/Banner';
// import BannerImage from '../../images/defaultBanner.jpeg'

import gym from "../../images/gym.jpg";
import Grid from "@material-ui/core/Grid";
// import PlayArrow from '@material-ui/icons/PlayArrow';
import VideoSlider from "../_generic/VideoSlider";
import VideoCard from "../_generic/VideoCard";
import welcome from "../../images/welcome.svg";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
// import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "70px 0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
  },
  gridContainer: {
    marginBottom: "10px",
  },
  gridWorkAround: {
    padding: "20px",
    [theme.breakpoints.down("sm")]: {
      padding: "0",
    },
  },
  featuredContainer: {
    width: "100%",
    padding: "20px 0px",
    minHeight: "220px",
  },
  featureCardRoot: {
    display: "inline-block",
    position: "relative",
  },
  featureCard: {
    position: "relative",
    height: "120px",
    width: "220px",
    borderRadius: "2px",
    overflow: "hidden",
    display: "inline-block",
    pointerEvents: "none",
  },
  playFab: {
    position: "absolute",
    bottom: "-15%",
    left: "76%",
    height: "40px",
    width: "40px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(270deg, rgba(66,109,209,1) 0%, rgba(54,187,222,1) 100%)",
    cursor: "pointer",
    boxShadow: "0px 5px 15px rgba(51,212,255,0.31)",
  },
  fitImage: {
    width: "100%",
    objectFit: "cover",
    position: "absolute",
    top: "0",
    left: "0",
  },
  box: {
    padding: "5px",
    outline: "none",
  },
  card: {
    color: "black",
    borderRadius: "2px",
    minHeight: "100px",
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
  heroContainer: {
    borderRadius: "5px",
    padding: "20px 20px 20px 0",
    height: "33vh",
    width: "98%",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      width: "95%",
      padding: "10px 10px 10px 10px",
    },
  },
  heroLeft: {
    flex: 1,
    backgroundColor: "#424062",
    borderRadius: "6px",
    padding: "0px 20px 10px 20px",
  },
  heroRight: {
    flex: 1,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  welcomeImage: {
    width: "auto",
    height: "200px",
  },
}));

function IndexComponent() {
  const classes = useStyles();
  const [videos, setVideos] = useState({});

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/getFeatured`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setVideos(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const photoUrl = (id, photo) => {
    const thumb = `${process.env.REACT_APP_API_URL}/video/photo/${id}`;
    return photo ? thumb : gym;
  };

  if (!isEmpty(videos)) {
    if (videos.length > 7) {
      videos.length = 7;
    }
  }

  return (
    <React.Fragment>
      <SideComponent>
        <Grid container spacing={0}>
          <Grid
            item
            container
            justify="center"
            xs={12}
            style={{ color: "white" }}
          >
            <div className={classes.heroContainer}>
              <div className={classes.heroLeft}>
                <h2 style={{ marginBottom: "5px" }}>Get yourself Online !</h2>
                <p style={{ marginTop: "5px" }}>
                  Learn, teach, enjoy all in one place
                </p>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button
                    style={{ padding: "5px 10px", marginTop: "10px" }}
                    variant="contained"
                    size="small"
                  >
                    Upload Now
                  </Button>
                </Link>
              </div>
              <div className={classes.heroRight}>
                <img
                  className={classes.welcomeImage}
                  src={welcome}
                  alt="splay hero"
                />
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          style={{ margin: "50px 0px 10px 0px", padding: "0 20px" }}
          justify="space-between"
        >
          <h3
            style={{
              color: "white",
              display: "inline-block",
              margin: 0,
              alignSelf: "center",
            }}
          >
            Featured
          </h3>
          <Link style={{ textDecoration: "none" }} to="/featuredVideos">
            <Button>View More</Button>
          </Link>
        </Grid>

        {isEmpty(videos) === true ? (
          ""
        ) : (
          <>
            <VideoSlider>
              {videos &&
                videos.map((video) => (
                  <div key={video._id} className={classes.box}>
                    <VideoCard
                      title={video.title}
                      postedBy={video.postedBy}
                      thumbnail={photoUrl(video._id, video.photo)}
                      id={video._id}
                    />
                  </div>
                ))}
            </VideoSlider>
          </>
        )}
      </SideComponent>
    </React.Fragment>
  );
}

export default IndexComponent;
