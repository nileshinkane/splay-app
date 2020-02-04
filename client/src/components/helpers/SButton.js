import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
    color: {
        background: 'linear-gradient(270deg, rgba(66,109,209,1) 0%, rgba(54,187,222,1) 100%)',
        color: 'white',
        boxShadow: ' 0px 2px 8px 1px rgba(66,109,209,0.6)'
    },
    transparent: {
        background: 'transparent',
        color: 'lightgray'
    }

}))

export default function SButton(props) {

    const classes = useStyles();

    return (
        <Button
            className={props.yes ? classes.color : classes.transparent}
            {...props}
        >
            {props.children}
        </Button>
    )

}