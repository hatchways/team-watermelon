import * as ACTION_TYPES from './ActionTypes';

// dispatching auth info
export const login_success = (pay_load) => {
	return {
		type: ACTION_TYPES.LOGIN_SUCCESS,
		payload: pay_load
	};
};

export const login_failure = (pay_load) => {
	return {
		type: ACTION_TYPES.LOGIN_FAILURE,
		payload: pay_load
	};
};

// dispatching friends / user info

export const follow_friend = (pay_load) => {
	return {
		type: ACTION_TYPES.FOLLOW_FRIEND,
		payload: pay_load
	};
};

export const unfollow_friend = (pay_load) => {
	return {
		type: ACTION_TYPES.UNFOLLOW_FRIEND,
		payload: pay_load
	};
};

export const set_new_profile_picture = (pay_load) => {
	return {
		type: ACTION_TYPES.SET_NEW_PROFILE_PICTURE,
		payload: pay_load
	};
};

// dispatching lists
export const shoppingLists_loading = (lists) => {
	return {
		type: ACTION_TYPES.SH_LISTS_LOADING,
		payload: lists
	};
};

export const shoppingLists_loading_failed = (errmess) => {
	return {
		type: ACTION_TYPES.SH_LISTS_FAILED,
		payload: errmess
	};
};

export const add_shoppingList = (list) => {
	return {
		type: ACTION_TYPES.ADD_SH_LIST,
		payload: list
	};
};

export const delete_shoppingList = (list) => {
	return {
		type: ACTION_TYPES.DELETE_SH_LIST,
		payload: list
	};
};

export const update_shoppingList = (list) => {
	return {
		type: ACTION_TYPES.UPDATE_SH_LIST,
		payload: list
	};
}

// dispatching products

export const products_loading = (products) => {
	return {
		type: ACTION_TYPES.PRODUCTS_LOADING,
		payload: products
	};
};

export const products_loading_failed = (errmess) => {
	return {
		type: ACTION_TYPES.PRODUCTS_FAILED,
		payload: errmess
	};
};

export const delete_product = (list_id, product_id) => {
	return {
		type: ACTION_TYPES.DELETE_PRODUCT,
		payload: product_id,
		list: list_id
	};
};

export const add_product = (list_id, product_id) => {
	return {
		type: ACTION_TYPES.ADD_PRODUCT,
		payload: product_id,
		list: list_id
	};
};

export const show_product = (product) => {
	return {
		type: ACTION_TYPES.SHOW_PRODUCT,
		payload: product
	};
};

export const hide_product = (product, res) => {
	return {
		type: ACTION_TYPES.HIDE_PRODUCT,
		payload: product,
		res: res
	};
};
