import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Fab } from '@material-ui/core';
import PlayArrow from '@material-ui/icons/PlayArrow';
import fakeImg from '../../images/gym.jpg'

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        borderRadius: '5px',
        cursor: 'grab',
        padding: '8px'
    },
    thumbnail: {
        width: '100%',
        margin: 'auto',
        paddingTop: '56.25%',
        position: 'relative',
        overflow: 'hidden'
    },
    img: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        objectFit: 'cover',
    },
    fab: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        color: 'white',
        background: 'linear-gradient(270deg, rgba(66,109,209,1) 0%, rgba(54,187,222,1) 100%)',
    },
    footer: {
        color: 'white',
        padding: '2% 0',
        width: '100%',
        position: 'relative'
    },
    footerText: {

    }
}))

const VideoCard = (props) => {
    const classes = useStyles()

    return (
        <div className={classes.root} style={props.style} >
            <div className={classes.thumbnail} style={props.thumbnailStyle}>
                <img className={classes.img} src={props.thumbnail || fakeImg} alt="thumbnail" />
                <Fab size="small" className={classes.fab}>
                    <PlayArrow />
                </Fab>
            </div>
            <div className={classes.footer}>
                <Typography style={{ padding: '0 10px' }} variant="subtitle1" noWrap>{props.title || 'This is a temporary title for a temporary video'}</Typography>
                <Typography style={{ color: 'gray', padding: '0 10px' }} variant="subtitle2" noWrap>{props.postedBy || 'By Nilesh Inkane'}</Typography>
            </div>
        </div>
    );
}

export default VideoCard;
