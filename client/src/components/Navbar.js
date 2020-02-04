import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';
import SearchBox from './helpers/SearchBox';
import SButton from './helpers/SButton';

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
        justifyContent: 'flex-end',
        color: 'black',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'space-between',
        },
    },
    centerLink: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

}));

function Navbar() {

    const classes = useStyles();

    return (
        <React.Fragment>
            <div position="fixed" className={classes.appBar}>
                <Box className={classes.navLeft}>
                    <Link to="/" className={classes.logo}>home</Link>
                </Box>
                {/*---------*/}
                <Box className={classes.navRight}>
                    <SearchBox type="text" placeholder="Search" />
                    <Link className={classes.centerLink} style={{ textDecoration: 'none' }} to="/login">
                        <SButton>Login</SButton>
                    </Link>
                </Box>
            </div>
        </React.Fragment>
    );
}

export default Navbar;


