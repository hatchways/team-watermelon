import React,{useReducer} from "react";
import Routes from '../routes/Routes';
import AuthContext from './AuthContext';
import {AuthReducer,initialState} from './reducers/AuthReducer';
import ShListsContext from './ShListsContext';
import * as ShListsReducer from './reducers/ShListsReducer';
import * as ACTIONS from './actions/Actions';



function AuthContextState() {
    const [authState, authDispatch] = useReducer(AuthReducer, initialState);
    const [shListsState, shListsDispatch] = useReducer(ShListsReducer.ShListsReducer, ShListsReducer.initialState);


    return (

        <AuthContext.Provider
            value={ {
                ...authState,
                handleLogin: (payload) =>authDispatch(ACTIONS.login_success(payload)),
                handleLogout: (payload) =>authDispatch(ACTIONS.login_failure(payload))
            } }
        >
        <ShListsContext.Provider
            value={ {
                ...shListsState,
                dispatchShLists: (payload) =>shListsDispatch(ACTIONS.shoppingLists_loading(payload)),
                handleShListsFailure: (errMsg) =>shListsDispatch(ACTIONS.shoppingLists_loading_failed(errMsg)),
                dispatchNewShList: (list) =>shListsDispatch(ACTIONS.add_shoppingList(list)),
                handleShListDeletion: (list) =>shListsDispatch(ACTIONS.delete_shoppingList(list)),
            } }
        >
            <Routes/>
        </ShListsContext.Provider>
        </AuthContext.Provider>

    );
}

export default AuthContextState;