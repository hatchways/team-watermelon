import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Typography, Grid, TextField} from '@material-ui/core';
import {addNewList} from '../state_management/actionCreators/shoppingListsActs';
import ShListsContext from '../state_management/ShListsContext';

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(1),
    },
    text: {
        marginTop: theme.spacing(1),
    },
    hidden:{
		visibility: "hidden",
    },
    shown:{
		visibility: "visible",
	},
}));

export default function BasicTextFields(props) {
    const shListsContext = useContext(ShListsContext);
    const classes = useStyles();
    const [listData, setListData] = useState({
        title: "",
        imageurl: '',
        listdescription: 'My shopping list',
        errMsg:'None',
    });
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
        setListData({ ...listData, errMsg: 'None'})
        if(listData.listdescription.length < 1)
            setListData({ ...listData, listdescription: "My shopping list"});
        addNewList(shListsContext.dispatchNewShList,listData);
        
    }

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>

        <Grid container spacing={1} justify="center" align="center">
            <Grid item xs={10} md={8} style={{textAlign:'center'}}>
                <TextField 
                    fullWidth
                    label="Title"
                    id="list-title" 
                    color="secondary"
                    name="title" 
                    placeholder="Enter list title" 
                    variant="standard" 
                    onChange={(e) => onChange(e)}
                    className={classes.text}
                    inputProps={{ maxLength: 20 }}
                    helperText="max length 20 charaters"
                    required
                    />
                <TextField 
                    fullWidth
                    label="Image Url"
                    id="list-image" 
                    color="secondary"
                    name="imageurl" 
                    placeholder="Paste list cover image url" 
                    variant="standard"
                    onChange={(e) => onChange(e)} 
                    className={classes.text}
                    required
                    />
                <TextField 
                    fullWidth
                    multiline
                    label="List Description"
                    name="listdescription"
                    id="list-description" 
                    color="secondary" 
                    placeholder="My shopping list" 
                    variant="standard" 
                    onChange={(e) => onChange(e)}
                    className={classes.text}
                    inputProps={{ maxLength: 200 }}
                    helperText="max length 200 charaters. Default: My shopping list"
                    />
            <Typography 
                color="error" 
                align="center" 
                className={listData.errMsg==='None'?classes.hidden:classes.shown}>
                {listData.errMsg}
            </Typography>
                <Button type="submit" size="large" variant="contained" color="primary" className={classes.button}>
                    Create List
                </Button>
            </Grid>
        </Grid>

    </form>
  );
}