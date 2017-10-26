import {usersReducer} from "./usersReducer";
import {combineReducers} from 'redux';

const reducer = {
	users: usersReducer
};

export default combineReducers(reducer);