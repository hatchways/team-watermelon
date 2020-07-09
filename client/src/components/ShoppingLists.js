import React,{useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ListCard from './ListCard';
import { makeStyles } from '@material-ui/core/styles';
import AddNewListBar from '../form/AddNewListBar';
import ShListsContext from '../state_management/ShListsContext';


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
                <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                Add New List:
                </Typography>
                <AddNewListBar/>    
            </Container>
            <Container maxWidth="md" component="main">
                <Typography variant="h5" align="left" color="textSecondary" component="p">
                My Shopping Lists:
                </Typography>
                <br/>
                <Grid container spacing={5} alignItems="flex-end">
                {shListsContext.lists.map((list) => (
                    <Grid item key={list._id} xs={12} sm={6} md={4}>
                        <ListCard list={list}/>
                    </Grid>
                ))}
                </Grid>
            </Container>
            
                
        </section>
    )
}


export default ShoppingLists;