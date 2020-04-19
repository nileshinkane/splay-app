import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SideComponent from './_generic/SideComponent';
import getId from './_methods/getVideoId';




const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        padding: '0px',
        color: 'white'
    },
    rightDiv: {
        flex: '0',
        [theme.breakpoints.down('md')]: {
            display: 'none'
        },
    }

}));


export default function VideoPlay(props) {

    const [link, setLink] = useState('')

    useEffect(() => {

        fetch(`${process.env.REACT_APP_API_URL}/video/${props.match.params.id}`, {
            method: 'GET'
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                let id = getId(data.link)
                setLink(id)
            })

    }, [props.match.params.id]);


    const classes = useStyles();

    return (
        <SideComponent>
            <div className={classes.root}>
                <div id="video-container" className="iframe-container">
                    <iframe title="splay-video" allowFullScreen="allowFullScreen" src={`https://www.youtube.com/embed/${link}??modestbranding=1&amp;autoplay=1&amp;iv_load_policy=3&amp;rel=0&amp;showinfo=0&amp;yt:stretch=16:9&amp;autohide=1&amp;color=red&amp;width=560&amp;width=560`} width="560" height="315" allowtransparency="true" frameBorder="0"></iframe>
                    {/* <iframe title="splay-video" allowFullScreen="allowFullScreen" src={link} width="560" height="315" allowtransparency="true" frameBorder="0"></iframe> */}
                    {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/DJtI3Pogd88" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}

                </div>
                <div className={classes.rightDiv}>

                </div>
            </div>
        </SideComponent>
    )
}