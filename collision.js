'use strict'
console.log('me');

function gameObjects() {
	this.a = 'one_value';
	this.b_method = function(a, b) {
		console.log(a, b);
	}
}