import React, { useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SSnackbar(props) {
    const [state, setState] = React.useState({
        open: false,
        Transition: Slide
    });




    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setState(false);
    };

    return (
        <div>
            <Snackbar
                open={state}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <Alert onClose={handleClose} severity="error">
                    {props.message}
                </Alert>
            </Snackbar>
        </div>
    );
}
