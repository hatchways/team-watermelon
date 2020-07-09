// import axios from 'axios';


const baseUrl = '';

export const fetchShLists = (dispatch,handleErr) => {



    return fetch(baseUrl + "/lists")
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
        },
        error => {
                var errmess = new Error(error.message);
                throw errmess;
    })
    .then(response => response.json())
    .then(res=>dispatch(res))
    .catch(error => handleErr(error.message));
}


export const addNewList = (dispatch,list) => {


    const newList = {
        title: list.title,
        imageurl: list.image,
        listdescription: list.description,
        products: []
    };
    
    return fetch(baseUrl + "/lists/new", {
        method: "POST",
        body: JSON.stringify(newList),
        headers: {
          "Content-Type": "application/json"
        },
        user:{
            id: list.user,
            // name: user_name //server end don't read this field?!
        }
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(res=>console.log(res))  //BE returns old data
    // .then(response => dispatch(response))  needs BE to send list id back
    .catch(error =>  { console.log('post a new list', error.message); alert('Your new list could not be created\nError: '+error.message); });
};