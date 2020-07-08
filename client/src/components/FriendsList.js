import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FriendCard from './FriendCard';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(5),
    },
}));


export default function FriendsList(props) {
    const classes = useStyles();
    const friends = props.friends;

    return (
        <section className={classes.root}>
            <Container maxWidth="sm" component="main">
                <Typography variant="h5" align="left" color="textSecondary" component="p">
                Friends:
                </Typography>
                <br/>
                <Grid container spacing={1} alignItems="center">
                    {friends.map((friend) => (
                        <Grid item key={friend._id} xs = {12} md = {12} lg={12}>
                        {FriendCard(friend)}
                        </Grid>
                    ))}
                </Grid>
        </Container>
        </section>
        );
}

FriendsList.propTypes = {
    friends: PropTypes.array,
};