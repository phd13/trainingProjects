var memory = 0,
	operations = document.getElementById('operations'),
	operation = '',
	numbers = document.getElementById('digits'),
	clear = document.getElementById('cBtn'),
	calculate = document.getElementById('eqlBtn'),
	resultField = document.getElementById('resultSpan'),
	result = '0';

resultField.innerHTML = result;

function getResult(x, y, op) {
	if (op === '+') {
		return x + y;
	} else if (op === '-') {
		return x - y;
	} else if (op === '*') {
		return x * y;
	} else {
		return x / y;
	}
}

clear.onclick = function () {
	memory = '';
	result = '0';
	operation = null;
	resultField.innerHTML = result;
};

numbers.onclick = function (event) {
	if (result === '0') {
		result = '';
	}
	result += event.target.value;
	resultField.innerHTML = result;
};

operations.onclick = function (event) {
	memory = result;
	result = '';
	operation = event.target.value;
	resultField.innerHTML = operation;
};

calculate.onclick = function () {
	result = getResult(parseInt(memory, 10), parseInt(result, 10), operation);
	memory = 0;
	resultField.innerHTML = result;
};