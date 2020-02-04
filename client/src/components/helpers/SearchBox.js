import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Box } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputBox: {
        padding: '0px',
        minHeight: '10px',
        width: '40vw',
        backgroundColor: '#363a4d',
        color: '#c2c2c2',
        borderRadius: '40px',
        outline: 'none',
        border: 'none',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            minHeight: '8px',
            width: '20vw',
        },

    },
    input: {
        backgroundColor: 'inherit',
        width: '100%',
        color: 'white',
        outline: 'none',
        border: 'none',
        borderRadius: '40px',
        fontSize: '15px',
        padding: '8px 3px',
    },
    searchIcon: {
        margin: '0 10px',
        fontSize: '20px'
    }
}))



const SearchBox = (props) => {
    const classes = useStyles();
    return (
        <form className={classes.root}>
            <Box className={classes.inputBox}>
                <SearchIcon className={classes.searchIcon} />
                <input className={classes.input} type={props.type} placeholder={props.placeholder} />
            </Box>
        </form>
    )
}

export default SearchBox;