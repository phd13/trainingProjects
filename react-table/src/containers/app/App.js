import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addUser, updateUser, loadUsers, removeUser} from "../../actions/usersActions";
import Header from "../../components/header/Header";
import UserModal from "../../components/user-modal/UserModal";
import UsersTable from "../../components/users-table/UsersTable";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isCreateUserModalShown: false,
			isEditUserModalShown: false,
			editableUserData: null
		}
	}

	componentWillMount() {
		this.props.loadUsers();
	}

	openCreateUserModal = () => {
		this.setState({
			isCreateUserModalShown: true
		});
	};

	openEditUserModal = (user) => {
		this.editableUserId = user.id;
		delete user.id;
		this.setState({
			isEditUserModalShown: true,
			editableUserData: user
		});
	};

	closeUserModal = () => {
		this.setState({
			isCreateUserModalShown: false,
			isEditUserModalShown: false
		});
	};

	createUser = (userData) => {
		this.props.addUser(userData);
		this.closeUserModal();
	};

	deleteUser = (id) => {
		this.props.removeUser(id);
	};

	editUser = (userData) => {
		this.props.updateUser(this.editableUserId, userData);
		this.closeUserModal();
	};

	render() {
		return (
			<div>
				<Header onCreateUser={this.openCreateUserModal}/>
				<UsersTable users={this.props.allUsers}
										onEditUser={this.openEditUserModal}
										onDeleteUser={this.deleteUser}/>
				<UserModal show={this.state.isCreateUserModalShown}
									 onCloseUserModal={this.closeUserModal}
									 onSubmit={this.createUser}/>
				<UserModal show={this.state.isEditUserModalShown}
									 onSubmit={this.editUser}
									 initialData={this.state.editableUserData}
									 onCloseUserModal={this.closeUserModal}/>
			</div>
		)
	}
}

export default connect((state) => {
	return {
		allUsers: state.users.allUsers
	}
}, {
	loadUsers,
	removeUser,
	addUser,
	updateUser
})(App);
