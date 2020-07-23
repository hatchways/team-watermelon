import { baseUrl } from '../../utils/baseUrl';

export const fetchProducts = (url, dispath, handleErr) => {
	return fetch(baseUrl + url)
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					var error = new Error('Error ' + response.status + ': ' + response.statusText);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				var errmess = new Error(error.message);
				throw errmess;
			}
		)
		.then((response) => response.json())
		.then((res) => {
			dispath(res.list.products);
		})
		.catch((error) => {
			handleErr(error.message);
			alert('fetching products failed' + error.message);
		});
};

export const addNewProduct = (list_id, dispatch, product, dispatch_local) => {
	const apiUrl = `/lists/${list_id}/products/new`;
	return fetch(baseUrl + apiUrl, {
		method: 'POST',
		body: JSON.stringify(product),
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(
			(response) => {
				if (response.ok) {
					return response;
				} else {
					var error = new Error('Error ' + response.status + ': ' + response.statusText);
					error.response = response;
					throw error;
				}
			},
			(error) => {
				throw error;
			}
		)
		.then((response) => response.json())
		.then((response) => {
			dispatch(list_id, response.newProduct._id);
			if (dispatch_local) {
				dispatch_local(response.newProduct);
			}
		})
		.catch((error) => {
			alert('Your new product could not be created\nError: ' + error.message);
		});
};
