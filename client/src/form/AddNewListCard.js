import React,{useState} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
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
      marginTop:"50%",
      marginBottom:"50%",
    },
  }));

const ListCard = ()=>{
    const classes = useStyles();
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
        <Dialog open={dialogOpen} onClose={()=>setDialogOpen(false)}>
            <DialogTitle id="form-dialog-title" align="center">Add New List</DialogTitle>
            <DialogContent>
                <AddNewListBar/>
            </DialogContent>
        </Dialog>
        </>
    )
}


export default ListCard;