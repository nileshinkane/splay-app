import React, { useState, useContext } from 'react';
import { Paper, Button } from '@material-ui/core'
import VideoCard from './VideoCard';
import { makeStyles } from '@material-ui/core/styles';
import SideComponent from '../_generic/SideComponent';
import gym from '../../images/gym.jpg'
import CustomSnackbar from '../_generic/Snackbar';
import { SnackbarContext } from '../../Contexts/SnackbarContext';
import { DialogBoxContext } from '../../Contexts/DialogBoxContext';
import Skeleton from '@material-ui/lab/Skeleton';
import SearchBox from '../_generic/SearchBox';
import DialogBox from './DialogBox';
import theme from '../../theme/index';



const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '70px',
        fontSize: '2rem'
    },
    videoListRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
        height: 'auto',
        marginTop: '30px'
    },
    videoListStyle: {
        position: 'relative',
        padding: '0 20px 0 0',
        display: 'flex',
        flexDirection: 'row',
        marginRight: '15px'
    },
    editStyles: {
        position: 'absolute',
        right: '10%',
        top: '85%',
        display: 'flex',
        flexDirection: 'row',

    }
}))


const VideoList = (props) => {
    const { snackbar, setSnackbar } = useContext(SnackbarContext);
    const { dialog, setDialog } = useContext(DialogBoxContext);
    const [videos, setVideos] = useState({
        status: false,
        skeleton: false,
        dialog: false,
        id: null,
        target: null,
        data: []
    })
    const [title, setTitle] = useState("")



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

    const deleteVideo = () => {
        const newItems = videos.data.filter(item => {
            return item._id !== videos.id
        })
        setVideos({
            ...videos,
            data: newItems
        })
        setDialog(false)
    }
    const handleDialog = (e, key) => {
        setDialog(true)
        setVideos({
            ...videos,
            id: key,
            target: e.target.parentNode.parentNode.parentNode
        })
    }


    return (
        <SideComponent>
            <SearchBox handleChange={handleChange} onSubmit={handleSubmit} className={classes.root} placeholder="Search a video in database" />
            {
                videos.data ? (
                    <div className={classes.videoListRoot}>
                        {
                            videos.data.map((current) =>
                                <div key={current._id} className={classes.videoListStyle}>
                                    <Paper style={{ marginTop: '20px' }}>
                                        <VideoCard style={{ width: '300px' }} thumbnail={gym} title={current.title} />
                                    </Paper>
                                    <div className={classes.editStyles}>
                                        <Button style={{ backgroundColor: theme.palette.primary.main }} size="small">Edit</Button>
                                        <Button style={{ backgroundColor: theme.palette.error.main, marginLeft: '10px' }} onClick={(e) => handleDialog(e, current._id)} size="small">Delete</Button>
                                    </div>
                                </div>
                            )
                        }
                    </div>

                )
                    : (
                        <h1 style={{ color: 'white' }}>No Videos</h1>
                    )
            }
            {
                videos.skeleton === true &&
                (
                    <div className={classes.videoListRoot}>
                        <VideoListSkeleton />
                    </div>

                )
            }

            {
                dialog ? <DialogBox title="Delete the video" data="Are you sure you want to delete this video ?" continue={deleteVideo} /> : ''
            }

            {
                snackbar ? <CustomSnackbar key={snackbar.date} severity="error" message="Really ??" /> : ''
            }
        </SideComponent >
    )
}


function renderSkeleton(number) {
    let skeleton = [];
    for (let index = 0; index < number; index++) {
        skeleton.push(
            <div key={index} style={{ display: 'flex', flexDirection: 'column', margin: '10px' }}>
                <Skeleton variant="rect" width={320} height={150} />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', marginTop: '10px' }}>
                    <Skeleton variant="rect" width={320} height={20} />
                    <Skeleton style={{ marginTop: '10px' }} variant="rect" width={320} height={20} />
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