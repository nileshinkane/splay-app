import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PowerIcon from '@material-ui/icons/Power';
import Satellite from '@material-ui/icons/SatelliteOutlined';
import Computer from '@material-ui/icons/ComputerOutlined';
import BuildIcon from '@material-ui/icons/Build';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import Divider from '@material-ui/core/Divider';
import isAuthenticated from '../_methods/isAuthenticated';
import AdminSidebar from '../AdminComponents/AdminSidebar';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// import UserMenu from '../UserComponents/UserMenu';

// import isUserAuthenticated from '../_methods/isUserAuthenticated';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: '240px',
        minWidth: '240px',
        position: 'fixed',
        top: '0%',
        left: '0%',
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    paper: {
        height: '100%',
        width: '100%',
        backgroundColor: '#252C48',
        paddingTop: '10px'
    },
    logo: {
        textAlign: 'left',
        margin: '0 0 0 10px',
        color: 'white',
    },
    sideBox: {
        width: '100%',
        padding: '10px 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    listBox: {
        width: '100%',
        marginTop: '20px',
        padding: '10px 0 0 10px ',
        color: 'lightgray'
    },
    icon: {
        color: 'lightgray',
        fontSize: '24px'
    },
    linkStyles: {
        textDecoration: 'none',
        color: 'inherit',
        padding: 0
    }

}));



function Sidebar() {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <div className={classes.paper}>
                <h2 className={classes.logo}>splay</h2>
                <div className={classes.listBox}>
                    {/* <h3 style={{ textAlign: 'left', color: "white", fontWeight: '400', }}>Categories</h3> */}
                    {/* <Divider style={{ backgroundColor: 'gray' }} /> */}
                    <List component="nav" aria-label="main mailbox folders">
                        <Link className={classes.linkStyles} to="/dept/cseit">
                            <ListItem button>
                                <ListItemIcon>
                                    <Computer className={classes.icon} />
                                </ListItemIcon>
                                <ListItemText primary="Cse & IT" />
                            </ListItem>
                        </Link>

                        <Link className={classes.linkStyles} to="/dept/electronics">
                            <ListItem button>
                                <ListItemIcon>
                                    <Satellite className={classes.icon} />
                                </ListItemIcon>
                                <ListItemText primary="Electronics" />
                            </ListItem>
                        </Link>

                        <Link className={classes.linkStyles} to="/dept/electrical">
                            <ListItem button>
                                <ListItemIcon>
                                    <PowerIcon className={classes.icon} />
                                </ListItemIcon>
                                <ListItemText primary="Electrical" />
                            </ListItem>
                        </Link>

                        <Link className={classes.linkStyles} to="/dept/mechanical">
                            <ListItem button>
                                <ListItemIcon>
                                    <BuildIcon className={classes.icon} />
                                </ListItemIcon>
                                <ListItemText primary="Mechnical" />
                            </ListItem>
                        </Link>

                        <Link className={classes.linkStyles} to="/dept/ash">
                            <ListItem button>
                                <ListItemIcon>
                                    <EmojiObjectsIcon className={classes.icon} />
                                </ListItemIcon>
                                <ListItemText primary="Applied Sciences and Humanities" />
                            </ListItem>
                        </Link>


                    </List>
                    <Divider style={{ backgroundColor: '#7D878E', opacity: '0.8', width: '110%', transform: 'translate(-10%,0)' }} />
                    {
                        isAuthenticated() ? (<AdminSidebar />)
                            : ('')
                    }


                </div>

            </div>
        </Box>
    )
}

export default Sidebar;