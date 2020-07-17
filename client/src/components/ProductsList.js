import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Grid, Container, Button} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ProductCard from './ProductCard';
import AddNewItemBar from '../form/AddNewItemBar';
import ShListsContext from '../state_management/ShListsContext';
import { Link as RouterLink } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(5),
        backgroundColor: theme.palette.background.default,
    },
    TopContent: {
        padding: theme.spacing(8, 0, 10),
    },
    typoHeading: {
        fontWeight: 'bold',
        marginBottom: theme.spacing(4)
    }
}));

export default function ProductsList(props) {
    const classes = useStyles();
    const shListsContext = useContext(ShListsContext);
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className={classes.root}>
            <Container maxWidth="sm" component="main" className={classes.TopContent} align="center">
                <Typography component="h1" variant="h4" align="center" color="textPrimary" className={classes.typoHeading} gutterBottom>
                Add new item:
                </Typography>
                <AddNewItemBar listId={props.listId}/>
            </Container>
            <Container maxWidth="md" component="main">
                <Typography variant="h5"  color="textPrimary" component="p" style={{fontWeight: 'bold'}}>
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
                    startIcon={<ArrowBackIcon />}
                    style={{borderRadius: '30px', padding: '10px'}}
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