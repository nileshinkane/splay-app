import React, { useEffect, useState, useContext } from 'react';
import { Grid, CircularProgress, IconButton, Tooltip, Typography } from '@material-ui/core'
import VideoCard from './VideoCard';
import { makeStyles } from '@material-ui/core/styles';
import SideComponent from '../_generic/SideComponent';
import gym from '../../images/gym.jpg'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CustomSnackbar from '../_generic/Snackbar';
import { SnackbarContext } from '../../Contexts/SnackbarContext';
import Skeleton from '@material-ui/lab/Skeleton';
import SearchBox from '../_generic/SearchBox';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '70px',
        fontSize: '2rem'
    }
}))

const videoListStyle = {
    padding: '0 20px 0 0',
    display: 'flex',
    flexDirection: 'row'
}

const VideoList = (props) => {
    const { snackbar, setSnackbar } = useContext(SnackbarContext);
    const [videos, setVideos] = useState({
        status: false,
        skeleton: false,
        data: []
    })
    const [title, setTitle] = useState("")
    // const { data, makeInfoVisible } = props

    const classes = useStyles()

    const inputParam = {
        title
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title !== "") {
            setVideos({
                ...videos,
                data: [],
                skeleton: true
            })
            fetch(`${process.env.REACT_APP_API_URL}/getSearchedVideos`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json"
                },
                body: JSON.stringify(inputParam)
            })
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    // setTimeout(() => {
                    setVideos({
                        ...videos,
                        skeleton: false,
                        data: data
                    })
                    // }, 2000);

                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            setSnackbar({ ...snackbar, msg: 'Really ?', severity: 'error', date: new Date() })
        }
    }


    const handleChange = (e) => {
        setTitle(e.target.value)
    }




    return (
        <SideComponent>
            <SearchBox handleChange={handleChange} onSubmit={handleSubmit} className={classes.root} placeholder="Search a video in database" />

            {
                videos.data && (
                    <Grid container style={{ minHeight: '100%', height: 'auto', marginTop: '30px' }}>
                        {
                            videos.data.map((current) =>
                                <div key={current._id} style={videoListStyle}>
                                    <VideoCard style={{ width: '280px' }} thumbnail={gym} title={current.title} />
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <Tooltip title="Edit" placement="right-start">
                                            <IconButton size="small" style={{ width: '40px', height: '40px' }}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete" placement="right-end">
                                            <IconButton size="small" style={{ width: '40px', height: '40px' }} >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </div>
                            )
                        }
                    </Grid>
                )
            }
            {
                videos.skeleton === true &&
                (
                    <Grid container>
                        <VideoListSkeleton />
                    </Grid>

                )
            }




            {
                snackbar ? <CustomSnackbar key={snackbar.date} severity="error" message="Really ??" /> : ''
            }
        </SideComponent>
    )
}



function renderSkeleton(number) {
    let skeleton = [];
    for (let index = 0; index < number; index++) {
        skeleton.push(
            <div key={index} style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}>
                <Skeleton variant="rect" width={280} height={150} />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', marginLeft: '10px' }}>
                    <Skeleton variant="circle" width={40} height={40} />
                    <Skeleton variant="circle" width={40} height={40} />
                </div>
            </div>)
    }
    return skeleton;
}

function VideoListSkeleton() {
    return (
        <>
            {renderSkeleton(9)}
        </>
    )
}

export default VideoList;



// 