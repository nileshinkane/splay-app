import React,{useState, useEffect, useContext} from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { Paper, FormControl, TextField } from '@material-ui/core';
import VideoCard from '../../_generic/VideoCard';
import CustomSnackbar from '../../_generic/Snackbar';
import SideComponent from '../../_generic/SideComponent';
import { SnackbarContext } from '../../../Contexts/SnackbarContext';
// import callSnackbar from '../../_methods/callSnackbar';


function getSteps() {
    return ['Add Title and Description', 'Add Link and Thumbnail', 'Final Output'];
}

let marginBetween = '20px';
const paperStyles = {
    marginTop: marginBetween,
    minHeight: '400px',
    padding: '20px'
}

const buttonStyles = {
    marginTop: marginBetween,
}
let videoData = {}; // empty object for FormData API
export default function AddVideoForm () {
    
    let steps = getSteps()
    const {snackbar, setSnackbar} = useContext(SnackbarContext);

    // const [status, setStatus] = useState("");
    // const callSnackbar = (msg, severity) => setStatus({ msg, severity, date: new Date() })

    const [state, setState] = useState ({
            activeStep: 0,
            title: '',
            link: '',
            description: '',
            photo: '',
            postedBy: '',
            imagePreview: '',
            fileSize: 0,
    });

    

    
    useEffect(()=>{
        videoData = new FormData();
    },[])

    const isValid = () => {
        const { title, description, fileSize, link } = state;
        if (fileSize > 100000) {
            // callSnackbar("Thumbnail size should be less than 100kb", "warning")
            setSnackbar({...snackbar, date: new Date(), msg : 'Thumbnail size should be less than 100kb', severity : 'warning'})
            return false;
        }

        if (title.length === 0 || description.length === 0) {
            // callSnackbar("Title and Description are required", "error")
            setSnackbar({ ...snackbar, date: new Date(), msg: 'Title and Description are needed !', severity: 'error' })
            return false;
        }

        if (link.length === 0 ) {
            // callSnackbar("Youtube Embed Link is required", "error")
            setSnackbar({ ...snackbar, date: new Date(), msg: 'Youtube embed link required !', severity: 'error' })
            return false;
        }
        return true;
    }

    const getStepContent = (activeStep) => {
        switch (activeStep) {
            case 0:
                return (
                    <TitleAndDesc inputValues={state} handleChange={handleChange} />
                )
            case 1:
                return (
                    <LinkAndThumb inputValues={state} handleChange={handleChange} />
                )
            case 2:
                return (
                    <DemoCard inputValues={state} />
                )
            default:
                return 'Unknown Step';
        }
    }

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        const fileSize = name === 'photo' ? e.target.files[0].size : 0
        videoData.set(name, value)
        setState({ ...state, [name]: value, fileSize })

        if (name === 'photo') {
            let reader = new FileReader();
            reader.onloadend = () => {
                setState({
                    ...state,
                    imagePreview: reader.result
                })
            }

            reader.readAsDataURL(e.target.files[0])
        }
    }

   
    const nextStep = () => {
        setState({
            ...state,
            activeStep: state.activeStep + 1
        })
    }

    const previousStep = () => {
        setState({
            ...state,
            activeStep: state.activeStep - 1
        })
    }

    const handleSubmit = () => {

        if(isValid() === true){
            setState({
                ...state,
                activeStep: 0,title: '', link: '', description: '',
                photo: '',postedBy: '',imagePreview: '',error: '',
            })

            submitVideo(videoData).then((data) => {
                // callSnackbar("Video Uploaded", "success")
                setSnackbar({ ...snackbar, date: new Date(), msg: 'Video Uploaded', severity: 'success' })
            })
            .catch(()=> {
                setSnackbar({ ...snackbar, date: new Date(), msg: 'Video not Uploaded', severity: 'error' })
            })
        }
        
    }

        return (
            <SideComponent>
            <div style={{ width: '80%', margin: 'auto' }}>
                <Stepper activeStep={state.activeStep} alternativeLabel>
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {state.activeStep === steps.length ? (
                        <div>
                           
                        </div>
                    ) : (
                            <div>
                                <Paper style={paperStyles} elevation={1}  >
                                    <form encType="multipart/form-data">
                                        {getStepContent(state.activeStep)}
                                    </form>
                                </Paper>
                                <div style={buttonStyles}>
                                    <Button
                                        disabled={state.activeStep === 0}
                                        onClick={previousStep}
                                    >
                                        Back
                                </Button>
                                    <Button variant="contained" color="primary"
                                        onClick={state.activeStep === steps.length - 1 ? handleSubmit : nextStep}
                                    >
                                        {state.activeStep === steps.length - 1 ? 'Submit Video' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        )}
                </div>
                {
                        snackbar ? <CustomSnackbar key={snackbar.date} variant="outlined" severity={snackbar.severity} message={snackbar.msg} /> : ''
                } 
            </div>
            </SideComponent>
        )
    
}



// Submit Video Function

const submitVideo = videoParam => {

    return fetch(`${process.env.REACT_APP_API_URL}/submitVideo`, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        body: videoParam
    })
        .then((response) => {
            return response.json()
        })
        .catch((err) => {
            console.log(err)
        })
}





function TitleAndDesc(props) {
    return (
        <>
            {/* <h3>Add the Video title and Description</h3> */}
            <FormControl variant="outlined" style={{ width: '100%' }}>
                <TextField
                    variant="outlined"
                    id="custom-css-standard-input"
                    label="Enter video Title"
                    value={props.inputValues.title || ''}
                    onChange={props.handleChange('title')}
                    required={true}
                />
            </FormControl>
            <FormControl variant="outlined" style={{ width: '100%', marginTop: '50px' }}>
                <TextField
                    variant="outlined"
                    multiline
                    rows={9}
                    rowsMax={9}
                    style={{ height: '50%' }}
                    id="custom-css-standard-input"
                    label="Enter the description"
                    value={props.inputValues.description || ''}
                    onChange={props.handleChange('description')}
                    required={true}
                />
            </FormControl>
        </>
    )
}

function LinkAndThumb(props) {
    return (
        <>
            <FormControl variant="outlined" style={{ width: '100%' }}>
                <TextField
                    variant="outlined"
                    id="custom-css-standard-input"
                    label="Enter the youtube Link"
                    value={props.inputValues.link || ''}
                    onChange={props.handleChange('link')}
                    required={true}
                />
            </FormControl>
            <FormControl variant="outlined" style={{ width: '100%', marginTop: '50px' }}>
                <TextField
                    variant="outlined"
                    id="custom-css-standard-input"
                    label="Enter the video's owner/creator"
                    value={props.inputValues.postedBy || ''}
                    onChange={props.handleChange('postedBy')}
                    required={true}
                />
            </FormControl>
            <FormControl variant="outlined" style={{ width: '100%', marginTop: '50px' }}>
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="contained-button-file"
                    multiple
                    onChange={props.handleChange('photo')}
                    type="file"
                />
                <label htmlFor="contained-button-file" style={{ display: 'inline-block' }}>
                    <Button variant="contained" color="primary" component="span">
                        Upload Thumbnail
                    </Button>
                </label>
                <p style={{ fontSize: '0.8rem', color: 'gray' }}>Always upload thumbnails in 16:9 ratio </p>
                {props.inputValues.imagePreview && <img style={{ width: '100%', marginTop: marginBetween }} alt="temporary display" src={props.inputValues.imagePreview} /> }
            </FormControl>
        </>
    )
}

function DemoCard(props) {
    return (
        <>
            <h2>This is how it'll look</h2>
            {
                props.inputValues.imagePreview ?
                    (
                        <>
                            <p style={{ fontSize: '0.8rem', color: 'gray' }}>If your thumbnail is shorter than the silver रेखा or not as expected, do change the picture you're using and make it 16:9 ratio</p>
                            <VideoCard thumbnailStyle={{ border: 'solid 1px silver' }} style={{ width: '300px', margin: 'auto' }} title={props.inputValues.title} thumbnail={props.inputValues.imagePreview} />
                        </>
                    ) :
                    (
                        <p style={{ fontSize: '0.8rem', color: 'gray' }}>You haven't uploaded anything, What do you expect ?</p>
                    )
            }

        </>
    )
}
