import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CustomSnackbar(props) {
    const [open, setOpen] = React.useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    // const handleSnackbar = () => {
    //     setOpen(true);
    // };

    if (props.message === '') {
        return ''
    }
    else {
        return (
            <div>
                <Snackbar
                    open={open}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                >
                    <Alert onClose={handleClose} severity={props.severity}>
                        {props.message}
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}
