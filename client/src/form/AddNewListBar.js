import React, { useState, useContext } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Button, Typography, Grid, TextField, Box,CircularProgress} from '@material-ui/core';
// import ImageIcon from '@material-ui/icons/Image';
import {addNewList} from '../state_management/actionCreators/shoppingListsActs';
import ShListsContext from '../state_management/ShListsContext';
import axios from 'axios';

const addimage = "assets/images/addimage.png";

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
    button: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        borderRadius: '30px', 
        padding: '10px'
    },
    text: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    hidden:{
		visibility: "hidden",
    },
    shown:{
		visibility: "visible",
    },
    box:{
        backgroundColor: 'white',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    },
    addImg: {
		border: '1px transparent',
		width: '220px',
		height: '220px',
        marginTop: '10px',
        marginBottom: '10px'
    },
    input: {
        display: 'none',
    }
}));

export default function BasicTextFields(props) {
    const shListsContext = useContext(ShListsContext);
    const classes = useStyles();
    const initialListData = {
            title: "",
            imageurl: null,
            listdescription: '',
            errMsg:'None',
    }
    if(props.list){
        initialListData.title = props.list.title;
        initialListData.imageurl = props.list.image;
        initialListData.listdescription = props.list.subtitle;
    }
    const [listData, setListData] = useState(initialListData);

    
    const [uploading, setUploading] = useState(false);

    const onImageDrop = async () => {
        setUploading(true);
        var formData = new FormData();
        if(document.getElementById("contained-button-file").files){
            formData.append('image', document.getElementById("contained-button-file").files[0]);
            try {
                const res = await axios.post(`/upload/image-upload`, formData, {
                    headers: {
                        'Content-Type': `multipart/form-data`
                    }
                });
                setListData({ ...listData, imageurl:res.data.imageUrl});
            } catch (err) {
                setListData({ ...listData, errMsg:'Error: uploading file failed'});
            }
            setUploading(false);
        }
    };

    const onChange = (e) => setListData({ ...listData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(listData.title.length < 1){
            setListData({ ...listData, errMsg: "Title is required."})
            return
        };
        if(listData.imageurl.length < 1){
            setListData({ ...listData, errMsg: "Image is required."})
            return
        };
        
        if(props.isUpdate){
            addNewList(shListsContext.handleShListUpdate,listData,"PUT",`/lists/${props.list._id}`);
        }else{
            addNewList(shListsContext.dispatchNewShList,listData);
        }
        setListData({ ...listData, errMsg: 'None'})
    }

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>

        <Grid container spacing={1} justify="center" align="center" style={{backgroundColor: '#fbfcff'}}>
            <Grid item xs={10} md={8} >
            <Typography component="h5" style={{fontWeight: 'bold'}}>
                Add a title *
            </Typography>
            <Box className={classes.box} borderRadius={50} flexGrow={1}>
                <CustomTextField 
                    id="list-title" 
                    name="title" 
                    placeholder="Enter list title"
                    variant="outlined"  
                    onChange={(e) => onChange(e)}
                    className={classes.text}
                    inputProps={{ maxLength: 20,style:{textAlign:'center'}}}
                    required
                    value={listData.title}
                    />
            </Box>
            <Typography component="h5" style={{fontWeight: 'bold'}} >
                Add a cover
            </Typography>
            <Box className={classes.box} borderRadius={50} flexGrow={1}>
                <Grid container direction='column'>
                    <Grid item>
            <img
                src={listData.imageurl?listData.imageurl:addimage}
                className={classes.addImg}
                alt="img upload"
            />
                    </Grid>
                    <Grid item>
            <label htmlFor="contained-button-file">
            <Button variant="contained" disableElevation color="primary" component="span" className={classes.button} disabled={uploading}>
                Upload
                <input
                    value={listData.image}
                    onChange={onImageDrop}
                    accept="image/*"
                    name="image"
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                />
                {uploading && <CircularProgress size={48} className={classes.buttonProgress} />}
            </Button>
            </label>
                    </Grid>
                </Grid>
            </Box>
            <Typography component="h5" style={{fontWeight: 'bold'}} >
                Add a description
            </Typography>
            <Box className={classes.box} borderRadius={50} flexGrow={1}>
                <CustomTextField
                    value={listData.listdescription}
                    multiline
                    name="listdescription"
                    id="list-description" 
                    variant="outlined"
                    placeholder="My shopping list" 
                    onChange={(e) => onChange(e)}
                    className={classes.text}
                    inputProps={{ maxLength: 200,style: { textAlign: 'center' }}}
                    />
            </Box>
            <Typography 
                color="error" 
                align="center" 
                className={listData.errMsg==='None'?classes.hidden:classes.shown}>
                {listData.errMsg}
            </Typography>
                <Button type="submit" size="large" variant="contained" color="primary" className={classes.button}>
                    {props.isUpdate?"Update":"Create List"}
                </Button>
            </Grid>
        </Grid>

    </form>
  );
}