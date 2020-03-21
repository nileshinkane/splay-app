import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({

    root: {
        marginLeft: ' 0px ',
        minHeight: '90vh',
        padding: '30px 20px 20px 20px',
        [theme.breakpoints.up('md')]: {
            marginLeft: '240px',
            padding: '30px 20px 20px 20px',
            // width: 'calc(100% - 240px)',
        },
    }

}))

function SideComponent(props) {
    const classes = useStyles();
    return (
        <div className={classes.root} style={props.style}>
            {props.children}
        </div>
    )

}

export default SideComponent;