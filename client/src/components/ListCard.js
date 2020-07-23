import React,{useContext,useState} from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardActionArea,
    CardMedia,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import AuthContext from '../state_management/AuthContext';
import ShListsContext from '../state_management/ShListsContext';
import {fetchProducts} from '../state_management/actionCreators/productActs';
import {cutContentLength} from '../utils/transformText';
import {deleteList} from '../state_management/actionCreators/shoppingListsActs';
import AddNewListBar from '../form/AddNewListBar';

const useStyles = makeStyles((theme) => ({

    link: {
      margin: theme.spacing(1, 1.5),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '80%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    }
  }));

const ListCard = (prop)=>{
    const list =prop.list;
    const userName = prop.userName;
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const shListsContext = useContext(ShListsContext);
    const [hiddenList, setHiddenList] = useState(prop.hidden);
    const [openDeleteDialog, setDeleteDialogOpen] = useState(false);
    const [openUpdateDialog, setUpdateDialogOpen] = useState(false);
    const url = `/lists/${list._id}`;

    const getProductList=()=>{
        if(authContext.isAuthenticated){
            shListsContext.handleProductsFailure(null);
            fetchProducts(url,shListsContext.dispatchProducts,shListsContext.handleProductsFailure);
        }
    }

    const handleRevome = () => {
        deleteList(url,list._id,shListsContext.handleShListDeletion);
        handleDeleteDialogClose();
    };

    const handleDeleteDialogClickOpen = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };


    const handleUpdateDialogOpen = () => {
        setUpdateDialogOpen(true);
    };

    const handleUpdateDialogClose = () => {
        setUpdateDialogOpen(false);
    };

    return (
        <>
        {hiddenList ? (
            <Card className={classes.card}>
                <CardActionArea component={RouterLink} to={`/users/${userName}/productslist/${list._id}`}>
                    <CardMedia
                    className={classes.cardMedia}
                    image={list.image}
                    title={list.title}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {list.title}
                        </Typography>
                        <Typography gutterBottom component="h5">
                            {cutContentLength(list.subtitle,30,"no description")}
                        </Typography>
                        <Typography>
                            {list.products.length} items
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>

            ) : (
            <Card className={classes.card}>
            <CardActionArea component={RouterLink} onClick={getProductList} to={`/productslist/${list._id}`}>
                <CardMedia
                className={classes.cardMedia}
                image={list.image}
                title={list.title}
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {list.title}
                    </Typography>
                    <Typography gutterBottom component="h5">
                        {cutContentLength(list.subtitle,30,"no description")}
                    </Typography>
                    <Typography>
                        {list.products.length} items
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button 
                    fullWidth 
                    onClick={handleUpdateDialogOpen}
                    color="primary" 
                    variant="outlined" 
                    className={classes.link}>
                    Edit
                </Button>
                <Button 
                    fullWidth 
                    onClick={handleDeleteDialogClickOpen} 
                    color="primary" 
                    variant="outlined" 
                    className={classes.link}>
                    Remove
                </Button>                           
            </CardActions>
            <Dialog
                open={openDeleteDialog}
                onClose={handleDeleteDialogClose}
                aria-describedby="delete-dialog-description"
            >
                <DialogContent>
                <DialogContentText id="delete-dialog-description">
                    All products on the list will be removed. Are you sure you want to remove {list.title}?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleRevome} 
                        color="primary"
                    >
                        Remove all
                    </Button>
                    <Button 
                        onClick={handleDeleteDialogClose} 
                        color="primary" 
                        autoFocus
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
        )}
        <Dialog
        open={openUpdateDialog}
        onClose={handleUpdateDialogClose}
        aria-describedby="update-dialog"
        fullWidth
    >
        <DialogTitle id="update-dialog-title" align="center">Update List</DialogTitle>
        <DialogContent id="update-dialog-content">
            <AddNewListBar isUpdate={true} list={list}/>
        </DialogContent>
        </Dialog>
        </>
    )
}


export default ListCard;