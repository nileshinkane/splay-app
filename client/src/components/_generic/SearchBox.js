import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Box } from '@material-ui/core';
import clsx from 'clsx';


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
        borderRadius: '4px',
        outline: 'none',
        border: 'none',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            minHeight: '8px',
            width: '50vw',
        },

    },
    input: {
        backgroundColor: 'inherit',
        width: '100%',
        height: '100%',
        color: 'white',
        outline: 'none',
        border: 'none',
        borderRadius: '4px',
        fontSize: 'inherit',
        padding: '8px 3px',
    },
    searchIcon: {
        margin: '0 10px',
        fontSize: 'inherit'
    }
}))


const SearchBox = (props) => {
    const classes = useStyles();
    return (
        <div className={props.className} style={{ margin: 0 }} onSubmit={props.onSubmit}>
            <form className={props.className}>
                <Box className={clsx(classes.inputBox, props.className)}>
                    <SearchIcon className={classes.searchIcon} />
                    <input onChange={props.handleChange} className={classes.input} type={props.type} placeholder={props.placeholder} />
                </Box>
            </form>
        </div>
    )
}

export default SearchBox;