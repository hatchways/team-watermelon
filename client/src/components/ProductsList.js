import React,{useContext} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Grid, Container, Button} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ProductCard from './ProductCard';
import AddNewItemBar from '../form/AddNewItemBar';
import ShListsContext from '../state_management/ShListsContext';
import { Link as RouterLink } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(5),
    },
    TopContent: {
        padding: theme.spacing(8, 0, 10),
    },
}));

export default function ProductsList(props) {
    const classes = useStyles();
    const shListsContext = useContext(ShListsContext);
    const currentList = shListsContext.lists.find(list => list._id === props.listId);
    

    return (
        <section className={classes.root}>
            <Container maxWidth="sm" component="main" className={classes.TopContent} align="center">
                <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                Add New Product
                </Typography>
                <AddNewItemBar listId={props.listId}/>
            </Container>
            <Container maxWidth="md" component="main">
                <Typography variant="h5"  color="textPrimary" component="p" align="center">
                {currentList.title}
                </Typography>
                <Typography variant="body1"  color="textSecondary" align="center">
                {shListsContext.products.length} items
                </Typography>
                <br/>
                <Grid container spacing={1} alignItems="center">
                    {shListsContext.products.slice().reverse().map((product) => (
                        <Grid item key={product._id} xs = {12} md = {12} lg={12}>
                        <ProductCard 
                            product={product} 
                            listId={props.listId}
                        />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Grid container align="center" className={classes.TopContent}>
                <Grid item xs={12}>
                <Button 
                    component={RouterLink} 
                    variant="contained" 
                    color="primary" 
                    startIcon={<ArrowBackIcon />}
                    to="/main"
                >Back To Lists
                </Button>
                </Grid>
            </Grid>
        </section>
        );
}

ProductsList.propTypes = {
    listID: PropTypes.string,
};