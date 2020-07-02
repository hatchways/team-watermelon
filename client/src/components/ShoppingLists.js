import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ListCard from './ListCardComponent';
import { makeStyles } from '@material-ui/core/styles';

// using this lists as placeholder, 
const lists = [
    {
        _id:1,
        name: 'List 1',
        products_list: [
            {
                _id:1,
                name:"product 1",
                description:"product description 1",
                url:"https://source.unsplash.com/random",
                last_price:20,
                current_price:10
            },
            {
                _id:2,
                name:"product 2",
                description:"product description 2",
                url:"https://source.unsplash.com/random",
                last_price:20,
                current_price:10
            },
            {
                _id:3,
                name:"product 3",
                description:"product description 3",
                url:"https://source.unsplash.com/random",
                last_price:20,
                current_price:10
            }
        ],
        items: 35,
        cover_img:"https://source.unsplash.com/random"
    },
    {   
        _id:2,
        name: 'List 2',
        products_list: [
            {
                _id:4,
                name:"product 4",
                description:"product description 4",
                url:"https://source.unsplash.com/random",
                last_price:20,
                current_price:10
            },
            {
                _id:5,
                name:"product 5",
                description:"product description 5",
                url:"https://source.unsplash.com/random",
                last_price:20,
                current_price:10
            }
        ],
        items: 11,
        cover_img:"https://source.unsplash.com/random"
    },
    {
        _id:3,
        name: 'List 3',
        products_list: [
            {
                _id:6,
                name:"product 6",
                description:"product description 6",
                url:"https://source.unsplash.com/random",
                last_price:20,
                current_price:10
            },
            {
                _id:7,
                name:"product 7",
                description:"product description 7",
                url:"https://source.unsplash.com/random",
                last_price:20,
                current_price:10
            }
        ],
        items: 8,
        cover_img:"https://source.unsplash.com/random"
    }
    ,
    {
        _id:4,
        name: 'List 4',
        products_list: [
            {
                _id:8,
                name:"product 8",
                description:"product description 8",
                url:"https://source.unsplash.com/random",
                last_price:20,
                current_price:10
            },
            {
                _id:9,
                name:"product 9",
                description:"product description 9",
                url:"https://source.unsplash.com/random",
                last_price:20,
                current_price:10
            },
            {
                _id:2,
                name:"product 10",
                description:"product description 10",
                url:"https://source.unsplash.com/random",
                last_price:20,
                current_price:10
            }
        ],
        items: 8,
        cover_img:"https://source.unsplash.com/random"
    }
    ,
    {
        _id:5,
        name: 'List 5',
        products_list: [
            {
                _id:11,
                name:"product 11",
                description:"product description 11",
                url:"https://source.unsplash.com/random",
                last_price:20,
                current_price:10
            }
        ],
        items: 8,
        cover_img:"https://source.unsplash.com/random"
    }
  ];



const useStyles = makeStyles((theme) => ({
    
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    }
}));


const ShoppingLists = ()=>{
    const classes = useStyles();

    return(
        <>
        {/* Hero unit */}
        <Container maxWidth="sm" component="main" className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            My Shopping Lists
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" component="p">
            tracking products...
            </Typography>
        </Container>
        {/* End hero unit */}
        <Container maxWidth="md" component="main">
            <Grid container spacing={5} alignItems="flex-end">
            {lists.map((list) => (
                <Grid item key={list._id} xs={12} sm={6} md={4}>
                    {ListCard(list)}
                </Grid>
            ))}
            </Grid>
        </Container>
        </>
    )
}


export default ShoppingLists;