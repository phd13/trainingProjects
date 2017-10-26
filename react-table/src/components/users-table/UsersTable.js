import React, {Component} from "react";
import Table from "react-bootstrap/es/Table";
import './UsersTable.css';
import FormControl from "react-bootstrap/es/FormControl";
import FormGroup from "react-bootstrap/es/FormGroup";

export default class UsersTable extends Component {
	constructor(props) {
		super(props);

		this.state = {
			displayedUsers: props.users
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.users !== prevProps.users) {
			this.setState({
				displayedUsers: this.props.users
			});
		}
	}

	handleSearch = (event) => {
		let searchQuery = event.target.value.toLowerCase();
		let displayedUsers = this.props.users.filter((user) => {
			let searchValue = user.firstName.toLowerCase();
			return searchValue.indexOf(searchQuery) !== -1;
		});
		this.setState({displayedUsers});
	};

	render() {
		return (
			<div>
				<FormGroup>
					<FormControl type="text"
											 placeholder="Search user by name here"
											 className="search-field"
											 onChange={this.handleSearch} />
				</FormGroup>
				<Table striped bordered condensed hover responsive>
					<thead>
					<tr>
						<th>#</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Phone</th>
						<th>Actions</th>
					</tr>
					</thead>
					<tbody>
					{this.state.displayedUsers.map((user, index) => {
						return (
							<tr key={user.id + 'h' + index}>
								<td>{index + 1}</td>
								<td>{user.firstName}</td>
								<td>{user.lastName}</td>
								<td>{user.email}</td>
								<td>{user.phone}</td>
								<td>
									<a className="userAction" onClick={this.props.onEditUser.bind(this, user)}>Edit</a>
									<a className="userAction" onClick={this.props.onDeleteUser.bind(this, user.id)}>Delete</a>
								</td>
							</tr>
						)
					})}
					</tbody>
				</Table>
			</div>
		)
	}
}