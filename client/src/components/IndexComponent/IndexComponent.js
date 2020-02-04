import React from 'react';
import SideComponent from '../helpers/SideComponent';
import { makeStyles } from '@material-ui/core/styles';
import Banner from '../helpers/Banner';
import BannerImage from '../../images/defaultBanner.jpeg'

// import Gym from '../../images/gym.jpg';
import Grid from '@material-ui/core/Grid';
// import PlayArrow from '@material-ui/icons/PlayArrow';
import { Link } from 'react-router-dom';
import SButton from '../helpers/SButton';

import VideoSlider from '../helpers/VideoSlider';



const useStyles = makeStyles(theme => ({
    paper: {
        padding: '70px 0px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start'
    },
    gridContainer: {
        marginBottom: '10px'
    },
    gridWorkAround: {
        padding: '20px',
        [theme.breakpoints.down('sm')]: {
            padding: '0',
        },
    },
    featuredContainer: {
        width: '100%',
        padding: '20px 0px',
        minHeight: '220px',
    },
    featureCardRoot: {
        display: 'inline-block',
        position: 'relative'
    },
    featureCard: {
        position: 'relative',
        height: '120px',
        width: '220px',
        borderRadius: '2px',
        overflow: 'hidden',
        display: 'inline-block',
        pointerEvents: 'none'
    },
    playFab: {
        position: 'absolute',
        bottom: '-15%',
        left: '76%',
        height: '40px',
        width: '40px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(270deg, rgba(66,109,209,1) 0%, rgba(54,187,222,1) 100%)',
        cursor: 'pointer',
        boxShadow: '0px 5px 15px rgba(51,212,255,0.31)',
    },
    fitImage: {
        width: '100%',
        objectFit: 'cover',
        position: 'absolute',
        top: '0',
        left: '0'
    },
    box: {
        border: 'solid 1px red', // custom outline, remove after your work
        padding: '5px',
        outline: 'none', // removes default outline of slick-js boxes
    },
    card: {
        color: 'black',
        borderRadius: '2px',
        minHeight: '100px',
        height: '100%',
        width: '100%',
        backgroundColor: 'white',

    }
}));



function IndexComponent() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <SideComponent>

                <Grid container spacing={0}>
                    <Grid item xs={12} style={{ color: 'white' }}>
                        <Banner image={BannerImage}></Banner>
                    </Grid>
                </Grid>
                <h3 style={{ color: 'white' }}>Featured</h3>
                <VideoSlider>
                    <div className={classes.box}>
                        <div className={classes.card}>1</div>
                    </div>
                    <div className={classes.box}>
                        <div className={classes.card}>2</div>
                    </div>
                    <div className={classes.box}>
                        <div className={classes.card}>3</div>
                    </div>
                    <div className={classes.box}>
                        <div className={classes.card}>4</div>
                    </div>
                    <div className={classes.box}>
                        <div className={classes.card}>5</div>
                    </div>
                    <div className={classes.box}>
                        <div className={classes.card}>6</div>
                    </div>
                    <div className={classes.box}>
                        <div className={classes.card}>7</div>
                    </div>
                    <div className={classes.box}>
                        <div className={classes.card}>8</div>
                    </div>
                    <div className={classes.box}>
                        <div className={classes.card}>9</div>
                    </div>
                </VideoSlider>

                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <SButton yes="true" color="primary">watch now and share</SButton>
                </Link>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <SButton color="primary">Test</SButton>
                </Link>

            </SideComponent>
        </React.Fragment>
    )

}

export default IndexComponent;


