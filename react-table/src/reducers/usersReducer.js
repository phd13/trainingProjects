import actionTypes from "../constants/actionsTypes";
import {appState} from "../states/index";

export const usersReducer = (state = appState, action) => {
	const {type, payload} = action;

	switch (type) {
		case actionTypes.ADD_USER:
			return Object.assign({},state,{allUsers: payload});

		case actionTypes.REMOVE_USER:
			return Object.assign({},state,{allUsers: payload});

		case actionTypes.UPDATE_USER:
			return Object.assign({},state,{allUsers: payload});

		case actionTypes.LOAD_USERS:
			return Object.assign({},state,{allUsers: payload});

		default: {
			return state;
		}
	}
};