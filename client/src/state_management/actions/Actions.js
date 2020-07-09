import * as ACTION_TYPES from './ActionTypes'


// dispatching auth info
export const login_success = (pay_load) => {
    return {
        type: ACTION_TYPES.LOGIN_SUCCESS,
        payload: pay_load
    }
}

export const login_failure = (pay_load) => {
    return {
        type: ACTION_TYPES.LOGIN_FAILURE,
        payload: pay_load
    }
}

// dispatching lists
export const shoppingLists_loading = (lists) => {
    return{
        type: ACTION_TYPES.SH_LISTS_LOADING,
        payload: lists,
    }
};

export const shoppingLists_loading_failed = (errmess) => {
    return{
        type: ACTION_TYPES.SH_LISTS_FAILED,
        payload: errmess
    }
};

export const add_shoppingList = (list) => {
    return{
        type: ACTION_TYPES.ADD_SH_LIST,
        payload: list
    }
};

export const delete_shoppingList = (list) => {
    return{
        type: ACTION_TYPES.DELETE_SH_LIST,
        payload: list
    }
};