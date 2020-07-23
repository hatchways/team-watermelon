import React, { useState, useContext, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Button, Typography, Grid, TextField, Box} from '@material-ui/core';
import AuthContext from '../state_management/AuthContext';
import ShListsContext from '../state_management/ShListsContext';
import axios from 'axios';

const CustomTextField = withStyles({
    root: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          border: '0',
        },
      },
    },
  })(TextField);

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    },
    title: {
        fontWeight: 'bold'
    },
    text: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    hidden:{
		visibility: "hidden",
    },
    shown:{
		visibility: "visible",
    },
    box:{
        backgroundColor: 'white',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    },
    input: {
        display: 'none',
    }
}));

export default function BasicTextFields() {
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const shListsContext = useContext(ShListsContext);
    const [errorMsg, setErrorMsg] = useState('');
    const [userProfile, setUserProfile] = useState({
        name: authContext.name,
        email: authContext.email,
        password: ''
    });

    const onChange = (e) => setUserProfile({ ...userProfile, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(userProfile.name.length < 1) {
            setErrorMsg("Name is required.");
            return null;
        }
        if(userProfile.password.length < 1) {
            setErrorMsg("Password is required.");
            return null;
        } else if(userProfile.password.length < 6) {
            setErrorMsg("Password should be 6 or more characters.");
            return null;
        }
        
        const config = {
			headers: {
				'Content-Type': 'application/json'
			}
        };
        try {
            const newUserProfile = await axios.put(`/users/${authContext.id}/edit`, userProfile, config);
            setUserProfile({
                name: '',
                email: '',
                password: ''
            });
            setErrorMsg('');
            authContext.handleLogout({});
            shListsContext.handleShListsFailure({response:null});
        } catch (err) {
            const errors = err.response.data.errors;
            setErrorMsg(errors[0].msg);
		}
    }

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>

        <Grid container spacing={1} justify="center" align="center" style={{backgroundColor: '#fbfcff'}}>
            <Grid item xs={10} md={8} style={{textAlign:'center'}}>
            <Typography component="h5" className={classes.title} >
                User name *
            </Typography>
            <Box className={classes.box} borderRadius={50} flexGrow={1}>
                <CustomTextField 
                    id="profile-name" 
                    name="name" 
                    value={userProfile.name}
                    variant="outlined"  
                    onChange={(e) => onChange(e)}
                    className={classes.text}
                    required
                />
            </Box>
            <Typography component="h5" className={classes.title} >
                Email
            </Typography>
            <Box className={classes.box} borderRadius={50} flexGrow={1}>
                <CustomTextField 
                    id="profile-email" 
                    name="email" 
                    value={userProfile.email}
                    disabled
                    variant="outlined"
                    className={classes.text}
                />
            </Box>
            <Typography component="h5" className={classes.title} >
                Password *
            </Typography>
            <Box className={classes.box} borderRadius={50} flexGrow={1}>
                <CustomTextField 
                    id="profile-password" 
                    name="password"
                    placeholder="New password (6 chars)"
                    value={userProfile.password}
                    variant="outlined"
                    onChange={(e) => onChange(e)}
                    className={classes.text}
                    required
                />
            </Box>
            <Typography 
                color="error" 
                align="center" 
                className={errorMsg === '' ? classes.hidden : classes.shown}>
                {errorMsg}
            </Typography>
                <Button type="submit" size="large" variant="contained" color="primary" className={classes.button}>
                    Update Profile and Logout
                </Button>
            </Grid>
        </Grid>
    </form>
  );
}