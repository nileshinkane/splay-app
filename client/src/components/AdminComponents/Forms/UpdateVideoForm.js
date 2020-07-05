import React, { useState, useEffect, useContext } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import {
  Paper,
  FormControl,
  TextField,
  InputLabel,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Select,
  Typography,
  FormGroup,
} from "@material-ui/core";
import VideoCard from "../../_generic/VideoCard";
import CustomSnackbar from "../../_generic/Snackbar";
import SideComponent from "../../_generic/SideComponent";
import { SnackbarContext } from "../../../Contexts/SnackbarContext";
import gym from "../../../images/gym.jpg";

function getSteps() {
  return [
    "Add Title and Description",
    "Add Link and Thumbnail",
    "Final Output",
  ];
}

let marginBetween = "20px";
const paperStyles = {
  marginTop: marginBetween,
  minHeight: "400px",
  padding: "20px",
};

const buttonStyles = {
  marginTop: marginBetween,
};
let videoData = {}; // empty object for FormData API

let videoId;
const photoUrl = (id, photo) => {
  const thumb = `${process.env.REACT_APP_API_URL}/video/photo/${id}`;
  return photo ? thumb : gym;
};

export default function UpdateVideoForm(props) {
  videoId = props.match.params.videoId;

  let steps = getSteps();
  const { snackbar, setSnackbar } = useContext(SnackbarContext);
  const [activeStep, setActiveStep] = useState(0);

  const [state, setState] = useState({
    _id: "",
    title: "",
    department: "",
    link: "",
    description: "",
    photo: "",
    postedBy: "",
    imagePreview: "",
    imageFetched: false,
    featured: false,
    departmentFeatured: false,
    fileSize: 0,
  });

  const fetchVideo = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/video/${id}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setState((state) => ({
          ...state,
          _id: data._id,
          title: data.title,
          description: data.description,
          department: data.department,
          featured: data.featured,
          departmentFeatured: data.departmentFeatured,
          link: data.link,
          photo: data.photo,
          imageFetched: true,
          postedBy: data.postedBy,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    videoData = new FormData();
    fetchVideo(videoId);
    return () => {
      setSnackbar("");
    };
  }, [setSnackbar]);

  const isValid = () => {
    const { title, description, fileSize, link } = state;
    if (fileSize > 100000) {
      setSnackbar({
        ...snackbar,
        date: new Date(),
        msg: "Thumbnail size should be less than 100kb",
        severity: "warning",
      });
      return false;
    }
    if (title.length === 0 || description.length === 0) {
      setSnackbar({
        ...snackbar,
        date: new Date(),
        msg: "Title and Description are needed !",
        severity: "error",
      });
      return false;
    }

    if (link.length === 0) {
      setSnackbar({
        ...snackbar,
        date: new Date(),
        msg: "Youtube embed link required !",
        severity: "error",
      });
      return false;
    }
    return true;
  };

  const getStepContent = (activeStep) => {
    switch (activeStep) {
      case 0:
        return <TitleAndDesc inputValues={state} handleChange={handleChange} />;
      case 1:
        return (
          <LinkAndThumb
            inputValues={state}
            handleCheckbox={handleCheckbox}
            handleChange={handleChange}
          />
        );
      case 2:
        return <DemoCard inputValues={state} />;
      default:
        return "Unknown Step";
    }
  };

  const handleCheckbox = (name) => (e) => {
    setState({ ...state, [e.target.name]: e.target.checked });
    videoData.set(name, e.target.checked);
  };

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    if (name === "photo") {
      setState({
        ...state,
        imageFetched: false,
      });
    }
    const fileSize = name === "photo" ? e.target.files[0].size : 0;
    videoData.set(name, value);
    setState({ ...state, [name]: value, fileSize });

    if (name === "photo") {
      let reader = new FileReader();
      reader.onloadend = () => {
        setState({
          ...state,
          imagePreview: reader.result,
        });
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const previousStep = () => {
    setActiveStep(activeStep - 1);
  };
  // Update Video Function

  const updateVideo = (videoParam) => {
    return fetch(`${process.env.REACT_APP_API_URL}/video/${videoId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
      },
      body: videoParam,
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = () => {
    if (isValid() === true) {
      setState({
        ...state,
        title: "",
        link: "",
        description: "",
        photo: "",
        postedBy: "",
        imagePreview: "",
        error: "",
        featured: false,
        departmentFeatured: false,
      });

      updateVideo(videoData)
        .then((data) => {
          setSnackbar({
            ...snackbar,
            date: new Date(),
            msg: "Video Updated",
            severity: "success",
          });
        })
        .catch(() => {
          setSnackbar({
            ...snackbar,
            date: new Date(),
            msg: "Video not Uploaded",
            severity: "error",
          });
        });
    }
  };

  return (
    <SideComponent>
      <Typography
        variant="h4"
        align="center"
        style={{ color: "white" }}
        gutterBottom={true}
      >
        Add a video
      </Typography>
      <div style={{ width: "90%", margin: "auto" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div></div>
          ) : (
            <div>
              <Paper style={paperStyles} elevation={1}>
                <form encType="multipart/form-data">
                  {getStepContent(activeStep)}
                </form>
              </Paper>
              <div style={buttonStyles}>
                <Button disabled={activeStep === 0} onClick={previousStep}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={
                    activeStep === steps.length - 1 ? handleSubmit : nextStep
                  }
                >
                  {activeStep === steps.length - 1 ? "Update Video" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
        {snackbar ? (
          <CustomSnackbar
            key={snackbar.date}
            variant="outlined"
            severity={snackbar.severity}
            msg={snackbar.msg}
          />
        ) : (
          ""
        )}
      </div>
    </SideComponent>
  );
}

function TitleAndDesc(props) {
  return (
    <>
      {/* <h3>Add the Video title and Description</h3> */}
      <FormControl variant="outlined" style={{ width: "100%" }}>
        <TextField
          variant="outlined"
          id="custom-css-standard-input"
          label="Enter video Title"
          value={props.inputValues.title || ""}
          onChange={props.handleChange("title")}
          required={true}
        />
      </FormControl>
      <FormControl
        variant="outlined"
        style={{ width: "100%", marginTop: "25px" }}
      >
        <InputLabel id="demo-simple-select-outlined-label">
          Department
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={props.inputValues.department || "misc"}
          onChange={props.handleChange("department")}
        >
          <MenuItem value="misc">Misc</MenuItem>
          <MenuItem value="cseit">Cse/IT</MenuItem>
          <MenuItem value="extc">Electronics</MenuItem>
          <MenuItem value="elpo">Electrical</MenuItem>
          <MenuItem value="mech">Mechanical</MenuItem>
          <MenuItem value="ash">Applied Science and Humanities</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        variant="outlined"
        style={{ width: "100%", marginTop: "50px" }}
      >
        <TextField
          variant="outlined"
          multiline
          rows={9}
          rowsMax={9}
          style={{ height: "50%" }}
          id="custom-css-standard-input"
          label="Enter the description"
          value={props.inputValues.description || ""}
          onChange={props.handleChange("description")}
          required={true}
        />
      </FormControl>
    </>
  );
}

function LinkAndThumb(props) {
  return (
    <>
      <FormControl variant="outlined" style={{ width: "100%" }}>
        <TextField
          variant="outlined"
          id="custom-css-standard-input"
          label="Enter the youtube Link"
          value={props.inputValues.link || ""}
          onChange={props.handleChange("link")}
          required={true}
        />
      </FormControl>
      <FormControl
        variant="outlined"
        style={{ width: "100%", marginTop: "50px" }}
      >
        <TextField
          variant="outlined"
          id="custom-css-standard-input"
          label="Enter the video's owner/creator"
          value={props.inputValues.postedBy || ""}
          onChange={props.handleChange("postedBy")}
          required={true}
        />
      </FormControl>
      <FormControl
        variant="outlined"
        style={{ width: "100%", marginTop: "50px" }}
      >
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="contained-button-file"
          multiple
          onChange={props.handleChange("photo")}
          type="file"
        />

        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={props.inputValues.featured}
                onChange={props.handleCheckbox("featured")}
                name="featured"
              />
            }
            label="Featured"
          />{" "}
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={props.inputValues.departmentFeatured}
                onChange={props.handleCheckbox("departmentFeatured")}
                name="departmentFeatured"
              />
            }
            label="Department Featured"
          />
        </FormGroup>

        <label
          htmlFor="contained-button-file"
          style={{ display: "inline-block" }}
        >
          <Button variant="contained" color="primary" component="span">
            Upload Thumbnail
          </Button>
        </label>
        <p style={{ fontSize: "0.8rem", color: "gray" }}>
          Always upload thumbnails in 16:9 ratio{" "}
        </p>

        {/* New Thumbnail */}
        {props.inputValues.imagePreview && (
          <p style={{ fontSize: "1rem", color: "white", textAlign: "center" }}>
            New Thumbnail{" "}
          </p>
        )}
        {props.inputValues.imagePreview && (
          <img
            style={{ width: "100%", marginTop: marginBetween }}
            alt="temporary display"
            src={props.inputValues.imagePreview}
          />
        )}

        {/* Old thumbnail */}
        {props.inputValues.imageFetched && (
          <p style={{ fontSize: "1rem", color: "white", textAlign: "center" }}>
            Old Thumbnail{" "}
          </p>
        )}
        {props.inputValues.imageFetched === true && (
          <img
            style={{ width: "100%", marginTop: marginBetween }}
            alt="temporary display"
            src={photoUrl(videoId, props.inputValues.photo)}
          />
        )}

        {/* {props.inputValues.imagePreview || props.inputValues.imageFetched && 
                (<img 
                    style={{ 
                        width: '100%', 
                        marginTop: marginBetween 
                    }} 
                    alt="temporary display" 
                    src={props.inputValues.imagePreview || photoUrl(videoId, props.inputValues.photo)} />) } */}
      </FormControl>
    </>
  );
}

function DemoCard(props) {
  return (
    <>
      <h2>This is how it'll look</h2>
      {props.inputValues.imagePreview ? (
        <>
          <p style={{ fontSize: "0.8rem", color: "gray" }}>
            If your thumbnail is shorter than the silver line or not as
            expected, do change the image you're using and make it 16:9 ratio
          </p>
          <VideoCard
            thumbnailStyle={{ border: "solid 1px silver" }}
            style={{ width: "300px", margin: "auto" }}
            title={props.inputValues.title}
            thumbnail={props.inputValues.imagePreview}
            postedBy={props.inputValues.postedBy}
          />
        </>
      ) : (
        <p style={{ fontSize: "0.8rem", color: "gray" }}>
          You haven't uploaded anything, What do you expect ?
        </p>
      )}
    </>
  );
}
