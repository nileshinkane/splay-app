import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import EditIcon from '@material-ui/icons/Edit';

const linkStyles = {
    textDecoration: 'none',
    color: 'inherit',
    padding: 0
}

const AdminSidebar = () => {
    return (
        <div>
            <h3 style={{ color: "white", fontWeight: '400', textAlign: 'center' }}>Admin Functionalities</h3>
            <List component="nav" aria-label="main mailbox folders">
                <Link to="/addVideo" style={linkStyles}>
                    <ListItem button>
                        <ListItemIcon>
                            <AddCircleOutlineOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add Video" />
                    </ListItem>
                </Link>

                <Link to="/videoList" style={linkStyles}>
                    <ListItem button>
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        <ListItemText primary="Edit Video" />
                    </ListItem>
                </Link>
                {/* <ListItem button>
                    <ListItemIcon>

                    </ListItemIcon>
                    <ListItemText primary="Communication" />
                </ListItem>

                <ListItem button>
                    <ListItemIcon>

                    </ListItemIcon>
                    <ListItemText primary="Computer & IT" />
                </ListItem>

                <ListItem button>
                    <ListItemIcon>

                    </ListItemIcon>
                    <ListItemText primary="Management" />
                </ListItem> */}
            </List>
        </div>
    );
}

export default AdminSidebar;
