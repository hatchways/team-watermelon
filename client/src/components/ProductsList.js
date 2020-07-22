import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Grid, Container, Button, LinearProgress} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ProductCard from './ProductCard';
import AddNewItemBar from '../form/AddNewItemBar';
import ShListsContext from '../state_management/ShListsContext';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';



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
    const [userProducts, setUserProducts] = useState(null);
    const [userName, setUserName] = useState(props.userName);

    const currentList = shListsContext.lists.find(list => list._id === props.listId);

    const getUserProducts = async () => {
		try {
			const res = await axios.get('/users/'+props.userName+'/productslist/'+props.listId);
            await setUserProducts(res.data.products);
		} catch (error) {
			console.log('Error getting user');
		}
	};
    
    useEffect(() => {
        if(userName) {
            getUserProducts();
        } else {
            setUserProducts(null);
        }
        window.scrollTo(0, 0);
    }, [userName]);

    if(userName) {
        if(userProducts) {
            return (
            <section className={classes.root}>
                <Container maxWidth="md" component="main">
                    <Typography variant="h5"  color="textPrimary" component="p" style={{fontWeight: 'bold'}}>
                    {props.userName}'s Products:
                    </Typography>
                    <br/>
                    <Grid container spacing={1} alignItems="center">
                    {userProducts.map((product) => (
                        <Grid item key={product._id} xs = {12} md = {12} lg={12}>
                        <ProductCard 
                            product={product} 
                            listId={props.listId}
                            hidden={true}
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
                            to={`/users/${props.userName}`}
                        >Back To Lists
                        </Button>
                    </Grid>
                </Grid>
            </section>
            );
        } else {
            return <LinearProgress/>;
        }
    } else {
            return (
            <section className={classes.root}>
                <Container maxWidth="sm" component="main" className={classes.TopContent} align="center">
                    <Typography component="h1" variant="h4" align="center" color="textPrimary" className={classes.typoHeading} gutterBottom>
                    Add new item:
                    </Typography>
                    <AddNewItemBar listId={props.listId}/>
                </Container>
                <Container maxWidth="md" component="main">
                    <Typography variant="h5"  color="textPrimary" component="p" style={{fontWeight: 'bold'}} align="center">
                    {currentList ? currentList.title : ''}
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
};

ProductsList.propTypes = {
    listID: PropTypes.string,
};