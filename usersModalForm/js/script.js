'use strict';

$(document).ready(function () {
	let firstNameInput = $('#firstName'),
		lastNameInput = $('#lastName'),
		emailInput = $('#email'),
		phoneInput = $('#phone'),
		addUserModal = $('#userModal'),
		usersTable = $('#usersTable'),
		userInfoForm = $('#usersForm'),
		submitUserBtn = $('#submitUserBtn'),
		userInfoInput = $('.userInfoInput'),
		addNewUserButton = $('#addNewUserButton'),
		usersArray = [],
		isEditUserModal = false,
		isFormValid = false,
		editableUserId = null,
		keyConstants = {
			enter: 13
		};

	onLoad();

	//функции работающие с view

	function submitUserForm() {
		isFormValidCheck();
		if (isEditUserModal && isFormValid) {
			let userData = getUserDataFromInputs();
			editUser(editableUserId, userData);
			modalCloseAndReset();
		} else if (isFormValid) {
			let userData = getUserDataFromInputs();
			createUser(userData);
			modalCloseAndReset();
		}
	}

	function getUserDataFromInputs() {
		return {
			firstName: firstNameInput.val(),
			lastName: lastNameInput.val(),
			email: emailInput.val(),
			phone: phoneInput.val()
		}
	}

	function modalCloseAndReset() {
		userInfoForm.trigger('reset');
		addUserModal.modal('close');
	}


	function refreshTable() {
		clearUsersTable();
		usersArray.forEach((user) => {
			let el = $("<tr>", {
				html: $("<td>", {text: user.firstName})
					.add($("<td>", {text: user.lastName}))
					.add($("<td>", {text: user.email}))
					.add($("<td>", {text: user.phone}))
					.add($("<td>", {
						html: $("<a>", {class: "waves-effect waves-light btn blue lighten-1 editUserBtn", text: "Edit"})
							.add($("<a>", {
								class: "waves-effect waves-light btn blue lighten-1 deleteUserBtn",
								style: "margin-left: 5px",
								text: "Delete"
							}))
					})),
			}).attr('data-id', user.id);
			usersTable.append(el);
		})
		;
		$('.deleteUserBtn').click(onDeleteUserClick);
		$('.editUserBtn').click(onEditUserClick);
	}

	function clearUsersTable() {
		usersTable.find('tr').not(':first-child').remove();
	}

	function onDeleteUserClick() {
		let userRow = $(this).parent().parent(),
			userId = userRow.data('id');
		deleteUserById(userId);
		refreshTable();
	}

	function onEditUserClick() {
		isEditUserModal = true;
		let userRow = $(this).parent().parent();
		editableUserId = userRow.data('id');

		let editableUser = usersArray.find((user) => {
			return user.id === editableUserId;
	})

		firstNameInput.val(editableUser.firstName);
		lastNameInput.val(editableUser.lastName);
		emailInput.val(editableUser.email);
		phoneInput.val(editableUser.phone);
		addUserModal.modal('open');
	}

	function onLoad() {
		addUserModal.modal();
		$('#phone').mask('+7 (000) 000-00-00');
		$.validate({
			form: '#usersForm'
		});
		addNewUserButton.click(() => {
			addUserModal.modal('open');
		})
		;
		userInfoInput.keypress(() => {
			if (event.which === keyConstants.enter
			) {
				submitUserForm();
			}
		})
		;
		submitUserBtn.click(submitUserForm);
		getUsers();
	}

	function isFormValidCheck() {
		const emailCheckExp = emailInput.val().match(/^[0-9a-z-\.]+\@[0-9a-z-]{1,}\.[a-z]{1,}$/i);
		isFormValid = !emailCheckExp;
	}

	//функции работающие с данными

	function editUser(id, userData) {
		$.post(`/api/users/${id}`, userData)
			.done(onSuccess)
			.fail(onError);
	}

	function createUser(userData) {
		$.post(`/api/users`, userData)
			.done(onSuccess)
			.fail(onError);
	}

	function getUsers() {
		$.get('/api/users')
			.done(onSuccess)
			.fail(onError);
	}

	function deleteUserById(id) {
		$.ajax({
			url: `/api/users/${id}`,
			type: 'DELETE',
			success: onSuccess,
			error: onError
		});
	}

	function onSuccess(res) {
		usersArray = res;
		refreshTable();
	}

	function onError(err) {
		console.log(err);
	}
});