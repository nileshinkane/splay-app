import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SideComponent from "./_generic/SideComponent";
import getId from "./_methods/getVideoId";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: "0px",
    color: "white",
  },
  rightDiv: {
    flex: "0",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  videoContainer: {
    position: "relative",
    paddingBottom: "56.25%",
    paddingTop: "30px",
    width: "100%",
    "& > iframe": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
  },
}));

export default function VideoPlay(props) {
  const [link, setLink] = useState("");
  const [video, setVideo] = useState({});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/video/${props.match.params.id}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let id = getId(data.link);
        setVideo(data);
        setLink(id);
      });
  }, [props.match.params.id]);

  const classes = useStyles();

  return (
    <SideComponent>
      <div className={classes.root}>
        <div id="video-container" className={classes.videoContainer}>
          <iframe
            title="splay-video"
            allowFullScreen="allowFullScreen"
            src={`https://www.youtube.com/embed/${link}??modestbranding=1&amp;autoplay=1&amp;iv_load_policy=3&amp;rel=0&amp;showinfo=0&amp;yt:stretch=16:9&amp;autohide=1&amp;color=red&amp;width=560&amp;width=560`}
            width="640"
            height="480"
            allowtransparency="true"
            frameBorder="0"
          ></iframe>
        </div>
      </div>
      <Grid container style={{ marginTop: "20px" }}>
        <Typography variant="h4">{video.title}</Typography>
        <Typography style={{ marginTop: "20px", textAlign: "justify" }}>
          {video.description}
        </Typography>
      </Grid>
    </SideComponent>
  );
}
