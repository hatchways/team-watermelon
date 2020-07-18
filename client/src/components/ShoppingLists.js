import React,{useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Grid} from '@material-ui/core';
import ListCard from './ListCard';
import { makeStyles } from '@material-ui/core/styles';
import DropDownListBar from '../form/DropDownListBar';
import ShListsContext from '../state_management/ShListsContext';
import AddNewListCard from '../form/AddNewListCard';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    TopContent: {
        padding: theme.spacing(8, 0, 10),
    }
}));



const ShoppingLists = ()=>{
    const classes = useStyles();
    const shListsContext = useContext(ShListsContext);

    return(
        <section className={classes.root}>
            <Container maxWidth="sm" component="main" className={classes.TopContent}>
                <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
                Add New Item:
                </Typography>
                <DropDownListBar/>    
            </Container>
            <Container maxWidth="md" component="main">
                <Typography variant="h5" align="left" color="textSecondary">
                My Shopping Lists:
                </Typography>
                <br/>
                <Grid container spacing={5}>
                {shListsContext.lists.slice().reverse().map((list) => (
                    <Grid item key={list._id} xs={12} sm={6} md={4}>
                        <ListCard list={list}/>
                    </Grid>
                ))}
                    <Grid item xs={12} sm={6} md={4}>
                        <AddNewListCard/>
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
};

export default ShoppingLists;