import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { Button } from '@material-ui/core';
import L from '../../images/L.jpg';




const useStyles = makeStyles(theme => ({
    bannerRoot: {
        position: 'relative',
        overflow: 'hidden'
    },
    bannerImage: {
        objectFit: 'cover',
        width: '100%',
    },
    shade: {
        position: 'absolute',
        top: 0,
        left: '-3%',
        height: '100%',
        width: '60%',
        background: 'linear-gradient(90deg, #2a2626 0%, transparent 100%)'
    },
    textBox: {
        position: 'absolute',
        top: '5%',
        left: '2%',
        [theme.breakpoints.down('md')]: {
            fontSize: '0.7em'
        },
    }
}));


export default function Banner(props) {

    const classes = useStyles();

    return (
        <div className={classes.bannerRoot}>
            <div className={classes.shade}></div>
            <div style={{ maxWidth: '100%', maxHeight: '45vh', height: 'auto' }}>
                <img alt="splay hero" src={L} className={classes.bannerImage} />
            </div>
        </div>
    )


}