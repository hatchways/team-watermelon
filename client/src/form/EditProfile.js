import React, { useState, useContext, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Button, Typography, Grid, TextField, Box} from '@material-ui/core';
import AuthContext from '../state_management/AuthContext';
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
        marginBottom: theme.spacing(4),
        borderRadius: '30px', 
        padding: '10px'
    },
    title: {
        marginLeft: theme.spacing(4),
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

export default function BasicTextFields(props) {
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const [userProfile, setUserProfile] = useState({
        name: authContext.name,
        email: authContext.email,
        password: '',
        errMsg: 'None'
    });

    const getUserProfile = async () => {
		try {
            const res = await axios.get('/users/'+ authContext.id);
            await setUserProfile({
                name: res.data.name,
                email: res.data.email,
                password: res.data.password,
                errMsg: 'None'
            });
		} catch (error) {
			console.log('Error getting user');
		}
	};

    const onChange = (e) => setUserProfile({ ...userProfile, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(userProfile.name.length < 1){
            //check if name exists in DB.
            setUserProfile({ ...userProfile, errMsg: "Name is required."})
            return
        };
        if(userProfile.password.length < 1){
            //display password as string - currently displayed as hash
            setUserProfile({ ...userProfile, errMsg: "Password is required."})
            return
        };
        setUserProfile({ ...userProfile, errMsg: 'None'})
        //axios put data - copy paste BE /auth/post register for password checks and all
    }

    useEffect(() => {
        getUserProfile();
    }, []);

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>

        <Grid container spacing={1} justify="center" align="center" style={{backgroundColor: '#fbfcff'}}>
            <Grid item xs={10} md={8} style={{textAlign:'left'}}>
            <Typography component="h5" className={classes.title} >
                User name *
            </Typography>
            <Box className={classes.box} borderRadius={50} flexGrow={1}>
                <CustomTextField 
                    id="profile-name" 
                    name="username" 
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
                    type="text"
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
                className={userProfile.errMsg==='None'?classes.hidden:classes.shown}>
                {userProfile.errMsg}
            </Typography>
                <Button type="submit" size="large" variant="contained" color="primary" className={classes.button}>
                    Update Profile
                </Button>
            </Grid>
        </Grid>
    </form>
  );
}