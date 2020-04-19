import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Fab } from '@material-ui/core';
import PlayArrow from '@material-ui/icons/PlayArrow';
import fakeImg from '../../images/gym.jpg'
import { Link } from 'react-router-dom';

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
    rootLong: {
        width: '100%',
        padding: '10px 10px',
        display: 'flex',
        flexDirection: 'row',
        // height: '270px',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            padding: '8px 8px 5px 8px',
        },
        [theme.breakpoints.up('lg')]: {
            height: 'auto',
        },
    },
    leftLong: {
        position: 'relative',
        width: '30%',
        margin: '0 10px 0 10px',

        [theme.breakpoints.down('sm')]: {
            width: '50%',
            margin: '0 10px 0 0px',
        },
    },
    imgLong: {
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0
    },
    rightLong: {
        width: '60%',
        margin: '0 10px 0 10px',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            width: '50%',
            margin: '0 10px 0 0px',
        },
    },
    heading: {
        margin: 0,
        color: '#f3f3f3',
        fontWeight: '400',
        fontSize: '1.5em',
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.7em'
        },
    },
    description: {
        fontSize: '0.8em',
        marginTop: '3%',
        color: 'darkgray'
    },
    bold: {
        fontWeight: '800',
        color: '#B9C1C4',
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.5em'
        },
    },
    fabLong: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        color: 'white',
        background: 'linear-gradient(270deg, rgba(66,109,209,1) 0%, rgba(54,187,222,1) 100%)',
        [theme.breakpoints.down('sm')]: {
            padding: '0'
        },
    }
}))

const VideoCard = (props) => {
    const classes = useStyles()

    let checkedTitle = '', checkedDescription = '';

    checkedTitle = props.title && (props.title.split(" ").length >= 15 ? (props.title.split(" ").slice(0, 15).join(" ").concat('...')) : props.title)
    checkedDescription = props.description && (props.description.split(" ").length >= 45 ? (props.description.split(" ").slice(0, 45).join(" ").concat('...')) : props.description)
    if (checkedDescription !== '' && window.innerWidth < 400) {
        checkedDescription = ''
    }

    // const a = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry and this neverending shit is added extra.';
    // const b = "Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry.."

    if (props.type && props.type.toLowerCase() === 'long') {
        return (
            <div className={classes.rootLong}>
                <div className={classes.leftLong}>
                    <div style={{ paddingTop: '56.25%', position: 'relative', width: '100%', overflow: 'hidden' }}>
                        <img src={props.thumbnail || fakeImg} className={classes.imgLong} alt="thumbnail" />
                        <Link to={`/videoPlay/${props.id}`}>
                            <Fab size="small" className={classes.fabLong}>
                                <PlayArrow />
                            </Fab>
                        </Link>
                    </div>
                </div>
                <div className={classes.rightLong}>
                    {/* <Typography noWrap={true} variant="h4" classes={{ h4: classes.heading }}> How to get your body shaped like shit and that works well</Typography> */}
                    <p className={classes.heading}>{checkedTitle}</p>
                    {/* props.title && (props.title.split(" ").slice(0, 15).join(" ").concat('...')) */}
                    <p style={{ margin: '3% 0 0 0' }}>
                        <span className={classes.bold}>
                            CSE &amp; IT
                        </span>
                    </p>
                    <p className={classes.description}>{checkedDescription}</p>
                    {/* props.description && (props.description.split(" ").slice(0, 45).join(" ").concat('...')) */}
                </div>
            </div>
        )
    }

    return (
        <div className={classes.root} style={props.style} >
            <div className={classes.thumbnail} style={props.thumbnailStyle}>
                <img className={classes.img} src={props.thumbnail || fakeImg} alt="thumbnail" />
                <Link to={`/videoPlay/${props.id}`}>
                    <Fab size="small" className={classes.fab}>
                        <PlayArrow />
                    </Fab>
                </Link>
            </div>
            <div className={classes.footer}>
                <Typography style={{ padding: '8px 10px' }} variant="subtitle1" noWrap>{props.title || 'This is a temporary title for a temporary video'}</Typography>
                <Typography style={{ color: 'gray', padding: '0 10px' }} variant="subtitle2" noWrap>{props.postedBy ? `By ${props.postedBy}` : 'By Admin'}</Typography>
            </div>
        </div>
    );
}

export default VideoCard;
