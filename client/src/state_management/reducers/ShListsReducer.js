import * as ACTION_TYPES from '../actions/ActionTypes'

export const initialState = {
    lists:[],
    isLoading: false, 
    errMess: null,
    products:[],
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
                errMess:action.payload,
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
        case ACTION_TYPES.DELETE_PRODUCT:
            let temp = [];
            state.lists.forEach(list => {
                if(list._id === action.list){
                    list.products = list.products.filter(p=> p !== action.payload)
                    // console.log(list.products);
                    temp.push(list)
                }else{
                    temp.push(list)
                }
            });
            // console.log("payload",action.payload);
            return {
                ...state,
                lists:temp,
                isLoading:false,
                errMess: null,
            };
        case ACTION_TYPES.PRODUCTS_LOADING:
            return {
                ...state,
                products: action.payload,
                errMess: null,
            };
        case ACTION_TYPES.PRODUCTS_FAILED:
            return {
                ...state,
                products:[],
                errMess:action.payload,
            };
        case ACTION_TYPES.HIDE_PRODUCT:
            return {
                ...state,
                products:state.products.filter(p=> p._id !== action.payload._id),
            };
        default:
        return state;
    }
};

