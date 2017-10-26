console.log('Hey there!');

var values = {
	test: 123,
	count: 1,
	text: "test text"
};

var defaultValues = {
	count: null,
	text: "default text",
	data: {
		value: 123
	}
};

function mergeValues(objA, objB) {
	var resObj = {};
	for (var aKey in objA) {
		if (objA.hasOwnProperty(aKey))
			resObj[aKey] = objA[aKey];
	}
	for (var bKey in objB) {
		if (objB.hasOwnProperty(bKey))
			resObj[bKey] = objB[bKey];
	}
	return resObj;
}

var mergedValues = mergeValues(defaultValues, values);
console.log(mergedValues);

function intersectValues(objA, objB) {
	var objResult = {};

	for (var key in objA) {
		if (objA.hasOwnProperty(key) && objB.hasOwnProperty(key)) {
			objResult[key] = objA[key];
		}
	}
	return objResult;
}

var intersection = intersectValues(defaultValues, values);
console.log(intersection);

function subtractValues(objA, objB) {
	var result = {};

	for (var key in objA) {
		if (objA.hasOwnProperty(key) && !objB.hasOwnProperty(key)) {
			result[key] = objA[key];
		}
	}
	return result;
}

var diff = subtractValues(defaultValues, values);
console.log(diff);

function pow(a, step) {
	var res = a;

	for (i = 1; i < step; i++) {
		res *= a;
	}
	return res;
}