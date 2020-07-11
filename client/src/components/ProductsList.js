import React,{useEffect,useContext} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Grid, Container, Button} from '@material-ui/core';
import ProductCard from './ProductCard';
import AddNewItemBar from '../form/AddNewItemBar';
import AuthContext from '../state_management/AuthContext';
import ShListsContext from '../state_management/ShListsContext';
import { Link as RouterLink } from 'react-router-dom';
import {baseUrl} from '../utils/baseUrl';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(5),
    },
    TopContent: {
        padding: theme.spacing(8, 0, 10),
    },
}));

// const baseUrl = '';

let needsFetchAllProducts = true;
let productToRemove = null;

export default function ProductsList(props) {
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const shListsContext = useContext(ShListsContext);
    
    const url = `/lists/${props.listId}`;
    

    const fetchProductsData = () => {

        return fetch(baseUrl + url)
        .then(response => {
            if (response.ok) {
              return response;
            } else {
              var error = new Error('Error ' + response.status + ': ' + response.statusText);
              error.response = response;
              throw error;
            }
            },
            error => {
                    var errmess = new Error(error.message);
                    throw errmess;
        })
        .then(response => response.json())
        .then(res=>{shListsContext.dispatchProducts(res.list.products)})
        .catch(error =>console.log('fetching products failed', error.message));
    }

    
    useEffect(() => {
        let didCancel = false;
        if(!didCancel){
            if(authContext.isAuthenticated && needsFetchAllProducts){
                needsFetchAllProducts = false;
                console.log("test Products/useEffect");
                fetchProductsData()
            }
        }
        return () => {
            didCancel = true;
          };
    });

    return (
        <section className={classes.root}>
            <Container maxWidth="sm" component="main" className={classes.TopContent} align="center">
                <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                Add New Product
                </Typography>
                <AddNewItemBar listId={props.listId}/>
            </Container>
            <Container maxWidth="md" component="main">
                <Typography variant="h5"  color="textSecondary" component="p">
                Lists Name:
                </Typography>
                <br/>
                <Grid container spacing={1} alignItems="center">
                    {shListsContext.products.map((product) => (
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