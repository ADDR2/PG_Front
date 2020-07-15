/* 3rd party libraries */
import * as redux from "redux";
import thunk from 'redux-thunk';

// ducks
import DashBoard from '../ducks/Dashboard/Dashboard.reducer';
import Favorites from '../ducks/Favorites/Favorites.reducer';

export const configure = (initialState = {}) => {
	const reducer = redux.combineReducers({
        DashBoard,
        Favorites
    });

	const store = redux.createStore(
		reducer,
		initialState,
		redux.compose(
			redux.applyMiddleware(thunk),
			window.devToolsExtension ? window.devToolsExtension() : f => f
		)
	);

	return store;
};
