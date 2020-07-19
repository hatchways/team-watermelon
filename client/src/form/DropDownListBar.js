import React,{useState, useContext, useEffect} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    TextField,
    Grid,
    Button,
    MenuItem,
    Select,
    Container,
    Box,
    CircularProgress,
    Divider
}from '@material-ui/core';
import ShListsContext from '../state_management/ShListsContext';
import Snackbar from '@material-ui/core/Snackbar';
import {addNewProduct} from "../state_management/actionCreators/productActs";

const CustomTextField = withStyles({
    root: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          border: '0',
        },
      },
    },
  })(TextField);

const useStyles = makeStyles((theme) => ({
    btn: {
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
        borderRadius: '30px',
        marginLeft: '20px'
    },
    text: {
        width: '400px'
    },
    select: {
        width:"250px",
        '& .MuiOutlinedInput-notchedOutline': {
            border: '0',
        }
    },
    box:{
        backgroundColor: 'white',
    },
    bar: {
        display: "flex",
        flexWrap: "nowrap"
    },
    snack:{
        backgroundColor: "red",
    },
    buttonProgress: {
        color: '#DF1B1B',
        position: 'absolute',
        top: '2%',
        left: '32%',
    }
}));

const regex = RegExp("^https://.*|^http://.*");

export default function BasicTextFields() {
    const classes = useStyles();
    const shListsContext = useContext(ShListsContext);
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
    }

    useEffect(() => {
        let isUnmounted = false;
        if(loading) {
            let promise = addNewProduct(itemData.listId,shListsContext.dispatchNewProduct,{url:itemData.url});
            promise.then(() => {
                if(!isUnmounted) {
                    setLoading(false);
                    setItemData({
                        listId: '',
                        url: '',
                    });
                }
            });
        }
        return () => {
            isUnmounted = true;
        };
    }, [loading]);

    const handleSnackBarClose = (event, reason) => {
        setErrMsg({open:false,errMsg:""});
    };

    return (
        <>
        <form noValidate variant="standard"  autoComplete="off">
            <Container align="center" maxWidth="md" >
            <Box width="sm" height="sm" className={classes.box} borderRadius={50} flexGrow={1}>
                <Container>
            <Grid container spacing={1} direction="row" alignItems="center" align="center" className={classes.bar}>
            
                <Grid item xs={12} md={6}>
                <CustomTextField 
                    fullWidth
                    type="url"
                    name="url"
                    id="outlined-basic" 
                    value={itemData.url}
                    variant="outlined"
                    placeholder="Paste your link here" 
                    className={classes.text}
                    onChange={onChange}/>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={8} md={4}>
                <Select
                    color="secondary" 
                    name="listId"
                    value={itemData.listId}
                    onChange={onChange}
                    variant="outlined" 
                    displayEmpty
                    required
                    className={classes.select}
                >
                    <MenuItem value="" disabled color="secondary">
                        Select list
                    </MenuItem>
                    {shListsContext.lists.map(
                        l=>(<MenuItem value={l._id} key={l._id}>{l.title}</MenuItem>)
                    )}
                </Select>
                </Grid>
                <Grid item xs={2} md={2}>
                <Button 
                    color="primary"
                    variant="contained" 
                    size="large"
                    fullWidth
                    aria-label="add" 
                    className={classes.btn}
                    disabled={loading}
                    onClick={handleSubmit}
                    disableElevation>
                    Add
                    {loading && <CircularProgress size={48} className={classes.buttonProgress} />}
                </Button>
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