
import {baseUrl} from '../../utils/baseUrl';

export const fetchProducts = (url,dispath,handleErr) => {

    return fetch(baseUrl + url)
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
    .then(res=>{dispath(res.list.products)})
    .catch(error =>{handleErr(error.message);console.log('fetching products failed', error.message);});
}
