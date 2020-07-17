import React,{useContext,useState} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import AuthContext from '../state_management/AuthContext';
import ShListsContext from '../state_management/ShListsContext';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AddNewListBar from './AddNewListBar';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    area: {
        height: '100%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
      paddingTop:"30%",
      paddingBottom:"30%",
    },
    paper: { 
        minWidth: "500px" 
    },
  }));

const ListCard = ()=>{
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const shListsContext = useContext(ShListsContext);
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <>
        <Card className={classes.card}>
            <CardActionArea component="a" className={classes.area} onClick={()=>setDialogOpen(true)}>
                <CardContent className={classes.cardContent} align="center">
                    <PostAddIcon color="primary" fontSize="large"/>
                    <Typography gutterBottom component="h5" >
                    Add New List
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        <Dialog classes={{ paper: classes.paper}} open={dialogOpen} onClose={()=>setDialogOpen(false)}>
            <DialogTitle id="form-dialog-title" align="center">Create new list</DialogTitle>
            <DialogContent>
                <AddNewListBar/>
            </DialogContent>
        </Dialog>
        </>
    )
}


export default ListCard;