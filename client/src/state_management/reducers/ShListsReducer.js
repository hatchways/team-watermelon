import * as ACTION_TYPES from '../actions/ActionTypes'

export const initialState = {
    lists:[],
    isLoading: false, 
    errMess: null,
};
  
  

export const ShListsReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.SH_LISTS_LOADING:
            return {
                ...state,
                lists: action.payload.lists,
                isLoading: true,
                errMess: null,
            };
        case ACTION_TYPES.SH_LISTS_FAILED:
            return {
                ...state,
                lists:[],
                isLoading:false,
                errMess:action.payload.response,
            };
        case ACTION_TYPES.ADD_SH_LIST:
            return {
                ...state,
                lists:[action.payload.list,...state.lists],
                isLoading:false,
                errMess: null,
            };
        case ACTION_TYPES.DELETE_SH_LIST:
            return {
                ...state,
                lists:state.lists.filter(list=> list._id !== action.payload._id),
                isLoading:false,
                errMess: null,
            };
        default:
        return state;
    }
};

