import React, {Component} from "react";
import Modal from "react-bootstrap/es/Modal";
import Button from "react-bootstrap/es/Button";
import FormGroup from "react-bootstrap/es/FormGroup";
import Form from "react-bootstrap/es/Form";
import Col from "react-bootstrap/es/Col";
import ControlLabel from "react-bootstrap/es/ControlLabel";
import FormControl from "react-bootstrap/es/FormControl";
import MaskedFormControl from 'react-bootstrap-maskedinput';
import HelpBlock from "react-bootstrap/es/HelpBlock";

export default class UserModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userData: {
				firstName: '',
				lastName: '',
				email: '',
				phone: ''
			}
		};

		this.changedFields = {
			firstName: false,
			lastName: false,
			email: false,
			phone: false
		}
	}

	componentWillMount() {
		this.setInitialData();
	}

	componentDidUpdate(prevProps) {
		if (this.props.initialData && (this.props.show !== prevProps.show)) {
			this.setInitialData();
		}
	}

	setInitialData() {
		if (this.props.initialData) {
			this.setState({
				userData: this.props.initialData
			});
		}
	}

	isFormValid = () => {
		for (let field in this.state.userData) {
			if (this.state.userData.hasOwnProperty(field) && this.getValidationState(field) !== 'success' || !this.state.userData[field] || this.state.userData[field] === 0) {
				return false
			}
		}
		return true;
	};

	isEmailValid() {
		return this.state.userData.email.match(/^[0-9a-z-.]+@[0-9a-z-]+\.[a-z]+$/i);
	}

	resetUserData() {
		this.setState({
			userData: {
				firstName: '',
				lastName: '',
				email: '',
				phone: ''
			},
		});
	};

	getValidationState = (field) => {
		let length = this.state.userData[field].length;
		if (!length && this.changedFields[field]) {
			return 'error'
		} else if (field === 'email' && this.changedFields[field]) {
			return this.isEmailValid() ? 'success' : 'error'
		}
		else {
			return 'success'
		}
	};

	submitForm = (event) => {
		event.preventDefault();
		if (this.isFormValid()) {
			this.props.onSubmit(this.state.userData);
			this.resetUserData();
		}
	};

	handleInputChange = (field, event) => {
		let newValue = event.target.value;
		this.setState((prevState) => {
			prevState.userData[field] = newValue;
			return {
				userData: prevState.userData
			}
		});
		this.changedFields[field] = true;
	};

	closeModal = () => {
		this.props.onCloseUserModal();
		this.resetUserData();
	};

	render() {
		return (
			<Modal onHide={this.props.onCloseUserModal}
						 show={this.props.show}>
				<Form horizontal onSubmit={this.submitForm}>
					<Modal.Header>
						<Modal.Title>User info</Modal.Title>
					</Modal.Header>
					<Modal.Body>

						<FormGroup controlId="formHorizontalFirstName"
											 validationState={this.getValidationState('firstName')}>
							<Col componentClass={ControlLabel} sm={2}>
								First name
							</Col>
							<Col sm={10}>
								<FormControl type="text"
														 value={this.state.userData.firstName}
														 onChange={()=>this.handleInputChange('firstName')} placeholder="ex. John"/>
							</Col>
						</FormGroup>
						<FormGroup controlId="formHorizontalLastName"
											 validationState={this.getValidationState('lastName')}>
							<Col componentClass={ControlLabel} sm={2}>
								Last name
							</Col>
							<Col sm={10}>
								<FormControl type="text"
														 placeholder="ex. Doe"
														 value={this.state.userData.lastName}
														 onChange={()=>this.handleInputChange('lastName')}/>
							</Col>
						</FormGroup>
						<FormGroup controlId="formHorizontalEmail"
											 validationState={this.getValidationState('email')}>
							<Col componentClass={ControlLabel} sm={2}>
								Email
							</Col>
							<Col sm={10}>
								<FormControl type="email"
														 placeholder="ex johndoe@appleseed.com"
														 value={this.state.userData.email}
														 onChange={()=>this.handleInputChange('email')}/>
								{this.getValidationState('email') === 'error' && this.state.userData.email ?
									(<HelpBlock>Email is not valid!!1 :'(</HelpBlock>) : ''}
							</Col>
						</FormGroup>
						<FormGroup controlId="formHorizontalPhone"
											 validationState={this.getValidationState('phone')}>
							<Col componentClass={ControlLabel} sm={2}>
								Phone
							</Col>
							<Col sm={10}>
								<MaskedFormControl type="text"
																	 placeholder="ex. 89999999999"
																	 mask="+1 (111) 111-11-11"
																	 value={this.state.userData.phone}
																	 onChange={()=>this.handleInputChange('phone')}/>
							</Col>
						</FormGroup>

					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.closeModal}>Close</Button>
						<Button className={this.isFormValid() ? '' : 'disabled'} type='submit'>Submit</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		)
	}
}