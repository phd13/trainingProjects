import React, {Component} from "react";
import Navbar from "react-bootstrap/es/Navbar";
import Nav from "react-bootstrap/es/Nav";
import NavItem from "react-bootstrap/es/NavItem";

export default class Header extends Component {

	render() {
		return (
			<Navbar collapseOnSelect>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="/">React-Bootstrap-Table13</a>
					</Navbar.Brand>
					<Navbar.Toggle/>
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						<NavItem onClick={this.props.onCreateUser}>Create user</NavItem>
					</Nav>
					<Nav pullRight>
						<NavItem href="#">About</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}