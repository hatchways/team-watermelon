import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Link from '@material-ui/core/Link';
import ProductCard from './ProductCard';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    TopContent: {
        padding: theme.spacing(8, 0, 10),
    }
}));


export default function ProductsList(props) {
    const classes = useStyles();
    const products = props.products;
    console.log(products);

    return (
        <section className={classes.root}>
            <Container maxWidth="md" component="main">
                <Typography variant="h5" align="left" color="textSecondary" component="p">
                Lists Name:
                </Typography>
                <br/>
                <Grid container spacing={1} alignItems="center">
                    {products.map((product) => (
                        <Grid item key={product._id} xs = {12} md = {12} lg={12}>
                        {ProductCard(product)}
                        </Grid>
                    ))}
                </Grid>
        </Container>
        </section>
        );
}

ProductsList.propTypes = {
    post: PropTypes.object,
};