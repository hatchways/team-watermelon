import React,{useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddBoxIcon from '@material-ui/icons/AddBox';
import {
    TextField,
    Grid,
    IconButton,
    MenuItem,
    Select,
    Container,
    Box,
}from '@material-ui/core';
import ShListsContext from '../state_management/ShListsContext';
import Snackbar from '@material-ui/core/Snackbar';
import {addNewProduct} from "../state_management/actionCreators/productActs";


const useStyles = makeStyles((theme) => ({
    link: {
        marginTop: theme.spacing(1),
    },
    text: {
        marginTop: theme.spacing(1),
    },
    select: {
        marginTop: theme.spacing(1),
        width:"150px",
    },
    box:{
        backgroundColor: '#fff5ee',
        opacity: 1,
    },
    snack:{
        backgroundColor: "red",
    }
}));

const regex = RegExp("^https://.*|^http://.*");

export default function BasicTextFields() {
    const classes = useStyles();
    const shListsContext = useContext(ShListsContext);
    const [errMsg, setErrMsg] = useState({open:false, errMsg:""});
    const [itemData, setItemData] = useState({
        listId: '',
        url: '',
    });
    const onChange = (e) => setItemData({ ...itemData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!regex.test(itemData.url)){
            setErrMsg({open:true,errMsg:"ERROR: Invalid URL"})
            return
        }
        if(itemData.listId.length < 1){
            setErrMsg({open:true,errMsg:"ERROR: List is required."})
            return
        }
        
        addNewProduct(itemData.listId,shListsContext.dispatchNewProduct,{url:itemData.url});
        setItemData({
            listId: '',
            url: '',
        });
    }

    const handleSnackBarClose = (event, reason) => {
        setErrMsg({open:false,errMsg:""});
    };

    return (
        <>
        <form noValidate variant="standard"  autoComplete="off">
            <Container align="center" maxWidth="sm" >
            <Box width="sm" height="sm" className={classes.box} borderRadius={30}>
                <Container width="90%">
            <Grid container spacing={1} alignItems="flex-end" align="center" width="90%">
            
                <Grid item xs={12} md={6}>
                <TextField 
                    fullWidth
                    type="url"
                    name="url"
                    id="outlined-basic" 
                    value={itemData.url}
                    color="secondary" 
                    placeholder="Paste your link here" 
                    variant="standard" 
                    className={classes.text}
                    onChange={onChange}/>
                </Grid>
                <Grid item xs={8} md={4}>
                <Select
                    color="secondary" 
                    name="listId"
                    value={itemData.listId}
                    onChange={onChange}
                    variant="standard" 
                    displayEmpty
                    required
                    className={classes.select}
                >
                    <MenuItem value="" disabled>
                        <em>list</em>
                    </MenuItem>
                    {shListsContext.lists.map(
                        l=>(<MenuItem value={l._id} key={l._id}>{l.title}</MenuItem>)
                    )}
                </Select>
                </Grid>
                <Grid item xs={2} md={2}>
                <IconButton 
                    color="secondary" 
                    aria-label="add" 
                    className={classes.link} 
                    onClick={handleSubmit}>
                    <AddBoxIcon fontSize="large"/>
                </IconButton>
                </Grid>
            </Grid>
            </Container>
            </Box>
            </Container>
        </form>
        <Snackbar 
            open={errMsg.open} 
            autoHideDuration={2000} 
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
            onClose={handleSnackBarClose}
            message={errMsg.errMsg}
            ContentProps={{
                "aria-describedby": "message-id",
                className: classes.snack
              }}
            />
        </>
    );
}