import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Typography, Grid, TextField, InputBase, Box} from '@material-ui/core';
import {addNewList} from '../state_management/actionCreators/shoppingListsActs';
import ShListsContext from '../state_management/ShListsContext';

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
        marginBottom: theme.spacing(4),
        width: '300px'
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

        <Grid container spacing={1} justify="center" align="center" style={{backgroundColor: '#fbfcff'}}>
            <Grid item xs={10} md={8} style={{textAlign:'center'}}>
            <Typography component="h5" style={{fontWeight: 'bold'}}>
                Add a title *
            </Typography>
            <Box className={classes.box} borderRadius={50} flexGrow={1}>
                <InputBase 
                    id="list-title" 
                    name="title" 
                    placeholder="Enter list title"  
                    onChange={(e) => onChange(e)}
                    className={classes.text}
                    inputProps={{ maxLength: 20 }}
                    required
                    />
            </Box>
            <Typography component="h5" style={{fontWeight: 'bold'}} >
                Add a cover
            </Typography>
            <Box className={classes.box} borderRadius={50} flexGrow={1}>
                <InputBase 
                    id="list-image" 
                    name="imageurl" 
                    placeholder="Paste list cover image url" 
                    onChange={(e) => onChange(e)} 
                    className={classes.text}
                    required
                    />
                </Box>
                <Typography component="h5" style={{fontWeight: 'bold'}} >
                    Add a description
                </Typography>
                <Box className={classes.box} borderRadius={50} flexGrow={1}>
                    <InputBase 
                        multiline
                        name="listdescription"
                        id="list-description" 
                        placeholder="My shopping list" 
                        onChange={(e) => onChange(e)}
                        className={classes.text}
                        inputProps={{ maxLength: 200 }}
                        />
                </Box>
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