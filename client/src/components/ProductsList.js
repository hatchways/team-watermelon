import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ProductCard from './ProductCard';
import AddNewItemBar from '../form/AddNewItemBar';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(5),
    },
}));


export default function ProductsList(props) {
    const classes = useStyles();
    const products = props.products;

    return (
        <section className={classes.root}>
            <Container maxWidth="sm" component="main" className={classes.TopContent}>
                <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                Add New Item:
                </Typography>
                <AddNewItemBar/>
            </Container>
            <Container maxWidth="md" component="main">
                <Typography variant="h5" align="left" color="textSecondary" component="p">
                Lists Name:
                </Typography>
                <br/>
                <Grid container spacing={1} alignItems="center">
                    {products.map((product) => (
                        <Grid item key={product._id} xs = {12} md = {12} lg={12}>
                        <ProductCard product={product}/>
                        </Grid>
                    ))}
                </Grid>
        </Container>
        </section>
        );
}

ProductsList.propTypes = {
    products: PropTypes.array,
};