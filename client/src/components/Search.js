import React, { useState, useContext } from 'react';
import SideComponent from './_generic/SideComponent';
import { makeStyles } from '@material-ui/core/styles'
import VideoCard from './_generic/VideoCard';
import SearchBox from './_generic/SearchBox';
import CustomSnackbar from './_generic/Snackbar';
import { SnackbarContext } from '../Contexts/SnackbarContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import gym from '../images/gym.jpg';
import { Paper, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    searchBox: {
        width: '100%',
        height: '70px',
        fontSize: '2rem',
        position: 'sticky',
        top: '5px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        zIndex: '10',
        [theme.breakpoints.down('sm')]: {
            height: '40px',
            fontSize: '1em'
        },
    },
    videoListRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        // alignItems: 'flex-start',
        // minHeight: '100vh',
        height: 'auto',
        marginTop: '30px'
    }
}))

const Search = (props) => {

    const classes = useStyles()
    const { snackbar, setSnackbar } = useContext(SnackbarContext);
    const [title, setTitle] = useState('')
    const [start, setStart] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [state, setState] = useState({
        status: false,
        skeleton: false,
        dialog: false,
        id: null,
        target: null,
    })

    const [videos, setVideos] = useState([])

    let inputParam = {
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
            setSnackbar({ ...snackbar, msg: 'Cannot search blank space, can you ? 😜', severity: 'error', date: new Date() })
        }
    }

    const fetchImages = () => {
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
                }
                else {
                    setHasMore(true)
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
    const handleFocus = () => {
        setStart(0);
    }


    const photoUrl = (id, photo) => {
        const thumb = `${process.env.REACT_APP_API_URL}/video/photo/${id}`;
        return photo ? thumb : gym
    }

    return (
        <SideComponent>
            <div>
                <SearchBox handleChange={handleChange} onFocus={handleFocus} onSubmit={handleSubmit} className={classes.searchBox} placeholder="Search a video in database" />
                {
                    videos.length !== 0 && (
                        <InfiniteScroll
                            className={classes.videoListRoot}
                            dataLength={videos.length}
                            next={fetchImages}
                            loader={<Loader />}
                            hasMore={hasMore}
                            endMessage=""
                        >
                            {
                                videos.length !== 0 && (

                                    videos.map((current) => (
                                        <Paper key={current._id} style={{ width: '95%', marginBottom: '20px', flexGrow: 'none' }}>
                                            <VideoCard
                                                type="long"
                                                thumbnail={photoUrl(current._id, current.photo) || gym}
                                                title={current.title}
                                                postedBy={current.postedBy}
                                                description={current.description}
                                            />
                                        </Paper>
                                    ))

                                )
                            }

                        </InfiniteScroll>
                    )
                }




                {
                    snackbar ? <CustomSnackbar key={snackbar.date
                    } severity={snackbar.severity} msg={snackbar.msg} /> : ''
                }
            </div>
        </SideComponent>
    );
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
export default Search;
