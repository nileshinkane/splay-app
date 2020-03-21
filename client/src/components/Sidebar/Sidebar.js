import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalHospital from '@material-ui/icons/LocalHospitalOutlined';
import Satellite from '@material-ui/icons/SatelliteOutlined';
import Computer from '@material-ui/icons/ComputerOutlined';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircleOutlined';
import Divider from '@material-ui/core/Divider';
import isAuthenticated from '../_methods/isAuthenticated';
import AdminSidebar from '../AdminComponents/AdminSidebar';

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
                        <ListItem button>
                            <ListItemIcon>
                                <LocalHospital className={classes.icon} />
                            </ListItemIcon>
                            <ListItemText primary="Health" />
                        </ListItem>

                        <ListItem button>
                            <ListItemIcon>
                                <Satellite className={classes.icon} />
                            </ListItemIcon>
                            <ListItemText primary="Communication" />
                        </ListItem>

                        <ListItem button>
                            <ListItemIcon>
                                <Computer className={classes.icon} />
                            </ListItemIcon>
                            <ListItemText primary="Computer & IT" />
                        </ListItem>

                        <ListItem button>
                            <ListItemIcon>
                                <SupervisedUserCircleIcon className={classes.icon} />
                            </ListItemIcon>
                            <ListItemText primary="Management" />
                        </ListItem>

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