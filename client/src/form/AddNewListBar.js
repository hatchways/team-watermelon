import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {addNewList} from '../state_management/actionCreators/shoppingListsActs';
import ShListsContext from '../state_management/ShListsContext';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
        margin: theme.spacing(1),
        },
    },
    link: {
        margin: theme.spacing(1),
    },
    text: {
        margin: theme.spacing(1),
    },
}));

export default function BasicTextFields(props) {
    const shListsContext = useContext(ShListsContext);
    const classes = useStyles();
    const [listData, setListData] = useState({
        title: '',
        imageurl: '',
        listdescription: ''
    });
    const onChange = (e) => setListData({ ...listData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(listData);
        addNewList(shListsContext.dispatchNewShList,listData);
    }

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>

        <Grid container spacing={1} justify="center">
            <Grid item xs={10} md={8} style={{textAlign:'center'}}>
                <TextField 
                    fullWidth
                    label="Title"
                    id="list-title" 
                    color="secondary"
                    name="title" 
                    placeholder="Enter list title" 
                    variant="outlined" 
                    onChange={(e) => onChange(e)}
                    className={classes.text}/>
                <TextField 
                    fullWidth
                    label="Image Url"
                    id="list-image" 
                    color="secondary"
                    name="imageurl" 
                    placeholder="Paste list cover image url" 
                    variant="outlined"
                    onChange={(e) => onChange(e)} 
                    className={classes.text}/>
                <TextField 
                    fullWidth
                    multiline
                    label="List Description"
                    name="listdescription"
                    id="list-description" 
                    color="secondary" 
                    placeholder="Enter list description" 
                    variant="outlined" 
                    onChange={(e) => onChange(e)}
                    className={classes.text}/>
                <Button type="submit" size="large" variant="contained" color="primary" className={classes.link}>
                    Create List
                </Button>
            </Grid>
        </Grid>

    </form>
  );
}