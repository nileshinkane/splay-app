import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Box, Button, IconButton } from '@material-ui/core';
// import SearchBox from './_generic/SearchBox';
import SearchIcon from '@material-ui/icons/Search';

import AdminMenu from './AdminComponents/AdminMenu';
import isAuthenticated from './_methods/isAuthenticated';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: 'calc(100% - 250px)%',
        minHeight: '50px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0 1em',
        marginLeft: '240px',
        boxShadow: 'none',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '0',
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
        color: 'black'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginTop: '64px'
    },
    navLeft: {
        display: 'flex',
        flex: '2',
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '20px'
    },
    navRight: {
        display: 'flex',
        flex: '8',
        flexDirection: 'row',
        color: 'black',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    centerLink: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

}));

function Navbar(props) {


    const classes = useStyles();

    return (
        <React.Fragment>
            <div position="fixed" className={classes.appBar}>
                <Box className={classes.navLeft}>
                    <Link to="/" className={classes.logo}>home</Link>
                </Box>
                {/* -------------------------------------------------- */}
                <Box className={classes.navRight}>
                    <Link to="/search" style={{ textDecoration: 'none' }}>
                        {
                            window.innerWidth < 500 ? (
                                <IconButton aria-label="search" size="small">
                                    <SearchIcon style={{ fontWeight: '800' }} />
                                </IconButton>
                            ) : (
                                    <Button
                                        startIcon={<SearchIcon />}
                                    >
                                        Search
                                    </Button>)}
                    </Link>
                    {
                        isAuthenticated() ? <AdminMenu /> :
                            <Link className={classes.centerLink} style={{ textDecoration: 'none' }} to="/login">
                                <Button variant="text">Login</Button>
                            </Link>
                    }
                </Box>
            </div>
        </React.Fragment>
    );
}

export default Navbar;


