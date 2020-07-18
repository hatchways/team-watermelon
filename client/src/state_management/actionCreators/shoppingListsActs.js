
import {baseUrl} from '../../utils/baseUrl';

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
    .catch(error => handleErr(error));
}


export const addNewList = (dispatch,list) => {

    return fetch(baseUrl + "/lists/new", {
        method: "POST",
        body: JSON.stringify(list),
        headers: {
          "Content-Type": "application/json"
        },
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
    .then(response => dispatch(response))
    .catch(error =>  {alert('Your new list could not be created\nError: '+error.message);});
};

export const deleteList = (url, listId,dispatch) =>{

    return fetch(baseUrl + url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
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
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(res=>dispatch({_id:listId}))
        .catch(error =>{alert('Your list could not be deleted\nError: '+error.message)});
};
