import React, {useContext, useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {Grid, Container, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AuthContext from '../state_management/AuthContext';
import PhotoUpload from './PhotoUpload';
import EditProfile from '../form/EditProfile';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    TopContent: {
        padding: theme.spacing(8, 0, 10),
    },
    typoHeading: {
        fontWeight: 'bold',
        marginBottom: theme.spacing(4)
    },
    noProfileImg: {
		border: '1px transparent',
		borderRadius: '50%',
		width: '220px',
		height: '220px',
        marginTop: '20px',
        marginBottom: '20px'
    }
}));



const Profile = ()=>{
    const classes = useStyles();
    const authContext = useContext(AuthContext);

    return(
        <section className={classes.root}>
            <Container maxWidth="md" component="main" className={classes.TopContent}>
                <Typography component="h1" variant="h4" align="center" color="textPrimary" className={classes.typoHeading} gutterBottom>
                My Profile
                </Typography>
                <Grid container spacing={1} direction="row" justify="center" alignItems="flex-start">
                    <Grid item xs = {6} md = {6} lg={6} align="center">
                    <img
                        src={authContext.profile_picture}
                        className={classes.noProfileImg}
                        alt="profile picture"
                    />
                    <br></br>
                    <PhotoUpload style={{ backgroundColor: '#DF1B1B', color: 'white' }}/>
                    </Grid>
                    <Grid item xs = {6} md = {6} lg={6}>
                    <EditProfile/>
                    </Grid>
                </Grid>
            </Container>
        </section>
    )
}


export default Profile;