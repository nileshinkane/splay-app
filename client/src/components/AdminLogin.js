import React from 'react';
import SideComponent from './helpers/SideComponent';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, FormControl, InputLabel, InputAdornment, IconButton, OutlinedInput } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CircularProgress from '@material-ui/core/CircularProgress';
import SButton from '../components/helpers/SButton';
import adminLoginImage from '../images/admin-login.svg';
import { Redirect } from 'react-router-dom';
import SSnackbar from './helpers/Snackbar';


const useStyles = makeStyles(theme => ({
    root: {
        height: '60vh',
        width: '50vw',
        [theme.breakpoints.down('sm')]: {
            width: '70vw',
            height: '40vh',
        },
        backgroundColor: '#3D4153',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageBox: {
        flex: '2',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            display: 'none'
        },
    },
    loginBox: {
        flex: '3',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 20px',
        [theme.breakpoints.down('md')]: {
            flex: '1'
        },
    },
    form: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column'
    },
    white: {
        color: 'lightgray !important'
    }
}))



const AdminLogin = (props) => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        username: "",
        password: "",
        error: "",
        redirect: false,
        showPassword: false,
        loading: false
    });

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const authenticate = (jwt, next) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("jwt", JSON.stringify(jwt))
            next()
        }
    }


    const handleSubmit = event => {
        event.preventDefault();
        setValues({ loading: true })
        const { username, password } = values;
        const admin = {
            username,
            password
        }
        setTimeout(() => {
            signin(admin).then(data => {
                if (data.error) {
                    setValues({ error: data.error, loading: false });
                }
                else {
                    authenticate(data, () => {
                        setValues({ redirect: true })
                    })
                }
            })
        }, 1000);

    };

    const signin = admin => {
        return fetch("http://localhost:5000/signin", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(admin)
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                console.log(err)
            });
    }


    //Render the Components - AdminLogin or Profile Page
    if (values.redirect) {
        return <Redirect to="/adminPanel"></Redirect>
    }

    return (
        <SideComponent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper className={classes.root}>
                <div className={classes.imageBox}>
                    <img alt="splay login" src={adminLoginImage} style={{ width: '80%', height: '80%' }} />
                </div>
                <div className={classes.loginBox}>
                    <h3>Login as Admin</h3>
                    <form className={classes.form}>
                        <FormControl variant="outlined" style={{ width: '100%' }}>
                            <TextField
                                variant="outlined"
                                id="custom-css-standard-input"
                                label="Username"
                                value={values.username || ''}
                                onChange={handleChange('username')}
                                className={classes.white}
                                required={true}
                            />

                        </FormControl>

                        <FormControl variant="outlined" style={{ width: '100%' }}>
                            <InputLabel className={classes.white} htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password || ''}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            className={classes.white}
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={70}
                            />
                        </FormControl>
                        {values.loading ?
                            <CircularProgress /> :
                            <SButton type="submit" onClick={handleSubmit} style={{ width: '100%', padding: '10px 20px' }} yes="true">Login</SButton>
                        }
                    </form>
                </div>
            </Paper>
            {values.error ? <SSnackbar severity="error" message={values.error} /> : ''}
        </SideComponent>
    );
}


export default AdminLogin;
