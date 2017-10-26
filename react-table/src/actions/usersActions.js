import Request from 'superagent';
import actionTypes from '../constants/actionsTypes';

export const addUser = userData => dispatch => {
	Request
		.post(`http://localhost:8080/api/users`)
		.send(userData)
		.set('accept', 'application/json')
		.end((err, res) => {
			if (err) {
				console.log("err", err);
			} else {
				dispatch({type: actionTypes.ADD_USER, payload: res.body});
			}
		});
};
export const removeUser = id => dispatch => {
	Request
		.delete(`http://localhost:8080/api/users/${id}`)
		.send()
		.set('accept', 'application/json')
		.end((err, res) => {
			if (err) {
				console.log("err", err);
			} else {
				dispatch({type: actionTypes.REMOVE_USER, payload: res.body});
			}
		});
};
export const updateUser = (id, userData) => dispatch => {
	Request
		.post(`http://localhost:8080/api/users/${id}`)
		.send(userData)
		.set('accept', 'application/json')
		.end((err, res) => {
			if (err) {
				console.log("err", err);
			} else {
				dispatch({type: actionTypes.UPDATE_USER, payload: res.body});
			}
		});
};
export const loadUsers = () => dispatch => {
	Request
		.get('http://localhost:8080/api/users')
		.send()
		.set('accept', 'application/json')
		.end((err, res) => {
			if (err) {
				console.log("err", err);
			} else {
				dispatch({type: actionTypes.LOAD_USERS, payload: res.body});
			}
		});
};