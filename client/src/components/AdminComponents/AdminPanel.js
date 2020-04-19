import React, { useState, useContext } from 'react';
import SideComponent from '../_generic/SideComponent';
// import SearchBox from '../_generic/SearchBox';
// import { makeStyles } from '@material-ui/core/styles';
import CustomSnackbar from '../_generic/Snackbar';
import { SnackbarContext } from '../../Contexts/SnackbarContext';
// import VideoList from '../_generic/VideoList';
// import { Button, Grid } from '@material-ui/core';
import { Redirect } from 'react-router-dom';



// import { AdminContext } from '../../AdminContext';

// const useStyles = makeStyles(theme => ({

// }))

const AdminPanel = (props) => {

    const { snackbar } = useContext(SnackbarContext);

    const [dashboard] = useState({
        loading: false,
        title: "",
        submit: false
    })



    // const classes = useStyles()
    // const { admin, setAdmin } = useContext(AdminContext);

    if (dashboard.submit === true) {
        return (
            <Redirect to="/searchVideos" />
        )
    }
    return (
        <SideComponent>
            {
                snackbar ? <CustomSnackbar key={snackbar.date} variant="outlined" severity={snackbar.severity} message={snackbar.msg} /> : ''
            }
        </SideComponent>
    );
}

export default AdminPanel;




