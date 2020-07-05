import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import VideoSlider from "../_generic/VideoSlider";
import VideoCard from "../_generic/VideoCard";
import gym from "../../images/gym.jpg";

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
    outline: "none", // removes default outline of slick-js boxes
  },
  card: {
    color: "black",
    borderRadius: "2px",
    minHeight: "100px",
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
}));

function DeptFeatured(props) {
  const classes = useStyles();

  const photoUrl = (id, photo) => {
    const thumb = `${process.env.REACT_APP_API_URL}/video/photo/${id}`;
    return photo ? thumb : gym;
  };
  return (
    <React.Fragment>
      <h3 style={{ color: "white", margin: "40px 0 10px 0" }}>Featured</h3>

      <VideoSlider>
        {props.videos &&
          props.videos.featured.map((video) => (
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
    </React.Fragment>
  );
}

export default DeptFeatured;
