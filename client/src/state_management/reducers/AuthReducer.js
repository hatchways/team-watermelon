import * as ACTION_TYPES from '../actions/ActionTypes';

export const initialState = {
	id: '',
	name: '',
	isAuthenticated: false,
	email: '',
	my_lists: [],
	friends_list: [],
	profile_picture: ''
};

export const AuthReducer = (state, action) => {
	switch (action.type) {
		case ACTION_TYPES.LOGIN_SUCCESS:
			return {
				...state,
				name: action.payload.name,
				email: action.payload.email,
				profile_picture: action.payload.profile_picture,
				id: action.payload._id,
				my_lists: action.payload.my_lists,
				friends_list: action.payload.friends_list,
				isAuthenticated: true
			};
		case ACTION_TYPES.LOGIN_FAILURE:
			return {
				...state,
        id:'',
				name: '',
				email: '',
				my_lists: [],
				friends_list: [],
				isAuthenticated: false
			};
		case ACTION_TYPES.FOLLOW_FRIEND:
			return {
				...state,
				friends_list: [...state.friends_list, action.payload]
			};
		case ACTION_TYPES.UNFOLLOW_FRIEND:
			return {
				...state,
				friends_list: state.friends_list.filter((friend) => friend !== action.payload)
			};
		case ACTION_TYPES.SET_NEW_PROFILE_PICTURE:
			return {
				...state,
				profile_picture: action.payload
			};
		default:
			return state;
	};
};
