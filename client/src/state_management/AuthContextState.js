import React, { useReducer } from 'react';
import Routes from '../routes/Routes';
import AuthContext from './AuthContext';
import { AuthReducer, initialState } from './reducers/AuthReducer';
import ShListsContext from './ShListsContext';
import * as ShListsReducer from './reducers/ShListsReducer';
import * as ACTIONS from './actions/Actions';

function AuthContextState() {
	const [authState, authDispatch] = useReducer(AuthReducer, initialState);
	const [shListsState, shListsDispatch] = useReducer(ShListsReducer.ShListsReducer, ShListsReducer.initialState);

	return (
		<AuthContext.Provider
			value={{
				...authState,
				handleLogin: (payload) => authDispatch(ACTIONS.login_success(payload)),
				handleLogout: (payload) => authDispatch(ACTIONS.login_failure(payload))
			}}
		>
			<ShListsContext.Provider
				value={{
					...shListsState,
					dispatchShLists: (payload) => shListsDispatch(ACTIONS.shoppingLists_loading(payload)),
					handleShListsFailure: (payload) => shListsDispatch(ACTIONS.shoppingLists_loading_failed(payload)),
					dispatchNewShList: (payload) => shListsDispatch(ACTIONS.add_shoppingList(payload)),
					handleShListDeletion: (payload) => shListsDispatch(ACTIONS.delete_shoppingList(payload)),
					dispatchNewProduct: (listId, productId) => shListsDispatch(ACTIONS.add_product(listId, productId)),
					handleProductDeletion: (listId, productId) =>
						shListsDispatch(ACTIONS.delete_product(listId, productId)),
					dispatchProducts: (payload) => shListsDispatch(ACTIONS.products_loading(payload)),
					handleProductsFailure: (payload) => shListsDispatch(ACTIONS.products_loading_failed(payload)),
					showProduct: (payload) => shListsDispatch(ACTIONS.show_product(payload)),
					hideProduct: (payload) => shListsDispatch(ACTIONS.hide_product(payload))
				}}
			>
				<Routes />
			</ShListsContext.Provider>
		</AuthContext.Provider>
	);
}

export default AuthContextState;
