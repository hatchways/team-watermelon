import React,{useReducer} from "react";
import Routes from '../routes/Routes';
import AuthContext from './AuthContext';
import {AuthReducer,initialState} from './reducers/AuthReducer';
import * as ACTIONS from './actions/Actions';



function AuthContextState() {
    const [authState, authDispatch] = useReducer(AuthReducer, initialState);


    return (

        <AuthContext.Provider
        value={ {
            ...authState,
            handleLogin: (payload) =>
            authDispatch(ACTIONS.login_success(payload)),
            handleLogout: (payload) =>
            authDispatch(ACTIONS.login_failure(payload))
        } }
        >
            <Routes/>
        </AuthContext.Provider>

    );
}

export default AuthContextState;