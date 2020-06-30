import React from 'react';
import Typography from '@material-ui/core/Typography';
import useStyles from './style';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ListCard from './ListCardComponent';


// using tiers as placeholder
const tiers = [
    {
        title: 'List 1',
        price: '0',
        description: [
            'description 1'
        ],
        items: 35,
        image:"https://source.unsplash.com/random",
        buttonText: 'buttonText',
        buttonVariant: 'outlined',
    },
    {
        title: 'List 2',
        //   subheader: 'Most active',
        price: '15',
        description: [
            'description 2'
        ],
        items: 11,
        image:"https://source.unsplash.com/random",
        buttonText: 'buttonText',
        buttonVariant: 'contained'
    },
    {
        title: 'List 3',
        price: '30',
        description: [
            'description 3'
        ],
        items: 8,
        image:"https://source.unsplash.com/random",
        buttonText: 'buttonText',
        buttonVariant: 'outlined',
    }
    ,
    {
        title: 'List 4',
        price: '30',
        description: [
            'description 3'
        ],
        items: 8,
        image:"https://source.unsplash.com/random",
        buttonText: 'buttonText',
        buttonVariant: 'outlined',
    }
    ,
    {
        title: 'List 5',
        price: '30',
        description: [
            'description 3'
        ],
        items: 8,
        image:"https://source.unsplash.com/random",
        buttonText: 'buttonText',
        buttonVariant: 'outlined',
    }
  ];

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
            {tiers.map((tier) => (
                // Enterprise card is full width at sm breakpoint
                <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                    {ListCard(tier)}
                </Grid>
            ))}
            </Grid>
        </Container>
        </>
    )
}


export default ShoppingLists;