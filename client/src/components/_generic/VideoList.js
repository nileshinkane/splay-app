import React, { useState, useContext, useEffect } from 'react';
import { Paper, Button, CircularProgress } from '@material-ui/core'
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
import InfiniteScroll from 'react-infinite-scroll-component';
import theme from '../../theme/index';

import isAuthenticated from '../_methods/isAuthenticated';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: '70px',
        fontSize: '2rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        position: 'sticky',
        top: '8px',
        zIndex: '10'
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
    const [start, setStart] = useState(0);
    let [videos, setVideos] = useState([]);
    const [hasMore, setHasMore] = useState(true)
    const [state, setState] = useState({
        status: false,
        skeleton: false,
        dialog: false,
        id: null,
        target: null,
    })
    const [title, setTitle] = useState("")

    const classes = useStyles()

    useEffect(() => {
        return () => {
            setSnackbar('')
        }
    }, [setSnackbar])

    const inputParam = {
        title
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title !== "") {
            setState({
                ...state,
                skeleton: true
            })
            setVideos([])
            fetchImages();
        }
        else {
            setSnackbar({ ...snackbar, msg: 'Really ?', severity: 'error', date: new Date() })
        }
    }

    const fetchImages = (input) => {
        fetch(`${process.env.REACT_APP_API_URL}/getSearchedVideos/${start}`, {
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
                if (data.length === 0) {
                    setHasMore(false)
                    setState({
                        ...state,
                        skeleton: false,
                    })
                    setSnackbar({ ...snackbar, msg: 'No more Videos Found', severity: 'warning', date: new Date() })
                }
                else {
                    setHasMore(true)
                    setState({
                        ...state,
                        skeleton: false,
                    })
                    setVideos(previous => previous.concat(data))
                    setStart(previous => previous + 6)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const handleChange = (e) => {
        setTitle(e.target.value)
        setStart(0)
    }

    const deleteVideo = () => {
        const newItems = videos.filter(item => {
            return item._id !== videos.id
        })
        setVideos(newItems)
        fetch(`${process.env.REACT_APP_API_URL}/video/delete/${videos.id}`, {
            method: 'DELETE'
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setSnackbar({ ...snackbar, msg: 'Video deleted Sucessfully', severity: 'success', date: new Date() })
            })
            .catch((err) => {
                setSnackbar({ ...snackbar, msg: err, severity: 'error', date: new Date() })
            })
        setDialog(false)
    }
    const handleDialog = (e, key) => {
        setDialog(true)
        setState({
            ...state,
            id: key,
            target: e.target.parentNode.parentNode.parentNode
        })
    }

    const photoUrl = (id, photo) => {
        const thumb = `${process.env.REACT_APP_API_URL}/video/photo/${id}`;
        return photo ? thumb : gym
    }
    const handleFocus = () => {
        setStart(0);
    }


    return (
        <SideComponent>
            <div>
                <SearchBox handleChange={handleChange} onFocus={handleFocus} onSubmit={handleSubmit} className={classes.root} placeholder="Search a video in database" />
                {
                    videos.length !== 0 && (
                        <InfiniteScroll
                            className={classes.videoListRoot}
                            dataLength={videos.length}
                            next={fetchImages}
                            hasMore={hasMore}
                            loader={<Loader />}
                            endMessage=""
                            scrollThreshold="50px"
                        >
                            {
                                videos.length !== 0 && (videos.map((current) =>
                                    <div key={current._id} className={classes.videoListStyle}>
                                        <Paper style={{ marginTop: '20px' }}>
                                            <VideoCard
                                                type={props.type || ''}
                                                style={{ width: '300px' }}
                                                thumbnail={photoUrl(current._id, current.photo) || gym}
                                                title={current.title}
                                                postedBy={current.postedBy}
                                            />
                                        </Paper>
                                        {
                                            isAuthenticated() && (
                                                <div className={classes.editStyles}>
                                                    <Button style={{ backgroundColor: theme.palette.primary.main }} size="small">Edit</Button>
                                                    <Button style={{ backgroundColor: theme.palette.error.main, marginLeft: '10px' }} onClick={(e) => handleDialog(e, current._id)} size="small">Delete</Button>
                                                </div>
                                            )
                                        }

                                    </div>
                                ))


                            }
                        </InfiniteScroll>)
                }
                {
                    state.skeleton === true &&
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
                    snackbar ? <CustomSnackbar key={snackbar.date} severity={snackbar.severity} msg={snackbar.msg} /> : ''
                }
            </div>
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

const Loader = () => {
    return (
        <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
        }}>
            <CircularProgress />
        </div>
    )
}

function LoadingSkeleton() {
    return (
        <>
            {renderSkeleton(3)}
        </>
    )
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