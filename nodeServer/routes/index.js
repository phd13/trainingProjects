let fs = require('fs');

module.exports = function (app) {
	app.get('/api/users', function (req, res) {
		let usersArray = require('../json/users.json');
		res.status(200).send(usersArray);
	});

	app.post('/api/users/:id', function (req, res) {
		let id = req.params.id,
			userData = req.body,
			usersArray = require('../json/users.json'),
			index;

		usersArray.forEach((user, i) => {
			if (+user.id === +id) {
				index = i;
			}
		});

		if (typeof index === 'number') {
			usersArray[index] = Object.assign(usersArray[index], userData);
			writeJson(res, usersArray);
		} else {
			res.status(500).send('User with such id does not exist');
		}
	});

	app.post('/api/users', function (req, res) {
		let userData = req.body,
			usersArray = require('../json/users.json');
		userData.id = Math.random() * 100000000000000;
		usersArray.push(userData);
		writeJson(res, usersArray);
	});

	app.delete('/api/users/:id', function (req, res) {
		let id = req.params.id,
			usersArray = require('../json/users.json'),
			index;
		usersArray.forEach((user, i) => {
			if (+user.id === +id) {
				index = i;
			}
		});
		if (typeof index === 'number') {
			usersArray.splice(index, 1);
			writeJson(res, usersArray);
		} else {
			res.status(500).send('User with such id does not exist');
		}
	});
};

function writeJson(res, usersArray) {
	fs.writeFile('json/users.json', JSON.stringify(usersArray), 'utf8', (err) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(usersArray);
		}
	});
}