import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SideComponent from './helpers/SideComponent';



const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        padding: '0px',
        color: 'white'
    },
    rightDiv:{
        flex: '2',
        [theme.breakpoints.down('md')]: {
            display:'none'
        },
    }
   
}));


export default function VideoPlay() {

    const classes = useStyles();

    return(
        <SideComponent>
            <div className={classes.root}>
                <div className="iframe-container">
                <iframe allowFullScreen="allowFullScreen" src="https://www.youtube.com/embed/IGhQtwzfmXM??modestbranding=1&amp;autoplay=1&amp;iv_load_policy=3&amp;rel=0&amp;showinfo=0&amp;yt:stretch=16:9&amp;autohide=1&amp;color=red&amp;width=560&amp;width=560" width="560" height="315" allowtransparency="true" frameborder="0"></iframe>
                </div>
                <div className={classes.rightDiv}>

                </div>
            </div>
        </SideComponent>
    )
}