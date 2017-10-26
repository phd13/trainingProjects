'use strict';

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var wat = 'square';
var select = document.getElementById('selector');
var watColor = '#FFF';
var colorSelect = document.getElementById('colorSelector');

function Shape(title, x, y, width, height) {
	this.title = title;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = watColor;
}

Shape.prototype.getTitle = function () {
	return this.title;
};

var shape = new Shape('kek');

function inheritPrototype(child, parent) {
	child.prototype = Object.create(parent.prototype);
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

function Square(title, x, y, width, height) {
	Shape.apply(this, arguments);
};

inheritPrototype(Square, Shape);

Square.prototype.render = function drawSquare(context) {
	context.fillStyle = this.color;
	context.fillRect(this.x, this.y, this.width, this.height);
};

var square = new Square('square', 25, 25, 100, 100);

function Line(title, x, y, x1, y1) {
	Shape.apply(this, arguments);
	this.x1 = x1;
	this.y1 = y1;
}

inheritPrototype(Line, Shape);

Line.prototype.render = function drawLine(context) {
	context.strokeStyle = this.color;
	context.beginPath();
	context.moveTo(this.x, this.y);
	context.lineTo(this.x1, this.y1);
	context.closePath();
	context.stroke();
};

var line = new Line('line', 125, 200, 25, 200);

function Circle(title, x, y) {
	Shape.apply(this, arguments);
}

inheritPrototype(Circle, Shape);

Circle.prototype.render = function drawCircle(context) {
	context.fillStyle = this.color;
	context.beginPath();
	context.arc(this.x, this.y, 50, 0, 2 * Math.PI, false);
	context.fill();
};


canvas.onclick = function drawFigure(evt) {
	var pos = getMousePos(canvas, evt);

	if (wat === 'square') {
		(new Square('sq', pos.x, pos.y, 100, 100, watColor)).render(context);
	} else if (wat === 'circle') {
		(new Circle('cr', pos.x, pos.y, watColor)).render(context);
	} else if (wat === 'line') {
		(new Line('ln', pos.x, pos.y, pos.x + 50, pos.y + 50, watColor)).render(context);
	}
};

colorSelect.onchange = function (evt) {
	watColor = evt.target.value;
};

select.onchange = function (evt) {
	wat = evt.target.value;
};

console.log(shape.getTitle());