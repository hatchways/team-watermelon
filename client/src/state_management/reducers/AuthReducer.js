import * as ACTION_TYPES from '../actions/ActionTypes'

export const initialState = {
    _id:"",
    name: '',
    isAuthenticated: false,
    email: '',
    my_lists:[],
    friends_list:[]
};
  
  

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.LOGIN_SUCCESS:
        return {
            ...state,
            _id: action.payload._id,
            name: action.payload.name,
            email:action.payload.email,
            my_lists:action.payload.my_lists,
            friends_list:action.payload.friends_list,
            isAuthenticated: true
        };
        case ACTION_TYPES.LOGIN_FAILURE:
        return {
            ...state,
            _id:'',
            name:"",
            email:"",
            my_lists:[],
            friends_list:[],
            isAuthenticated: false
        };
        default:
        return state;
    }
};

