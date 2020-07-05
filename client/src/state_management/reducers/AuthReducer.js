import * as ACTION_TYPES from '../actions/ActionTypes'

export const initialState = {
    _id:"",
    name: 'no name',
    isAuthenticated: false,
    email: '',
    token: "",
    my_lists:[],
    friends_list:[]
};
  
  

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.LOGIN_SUCCESS:
        return {
            ...state,
            name: action.payload.name,
            email:action.payload.email,
            token:action.payload.token,
            my_lists:action.payload.my_lists,
            friends_list:action.payload.friends_list,
            isAuthenticated: true
        };
        case ACTION_TYPES.LOGIN_FAILURE:
        return {
            ...state,
            name:"",
            email:"",
            token:"",
            my_lists:[],
            friends_list:[],
            isAuthenticated: false
        };
        default:
        return state;
    }
};

