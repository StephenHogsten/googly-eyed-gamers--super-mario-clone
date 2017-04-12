'use strict'
console.log('me');

// 0,0 is upper left corner
// height goes down, width goes to the right
// height of world is 100


function gameObjects(objectArray, worldHeight, worldWidth) {
	this.objectArray = objectArray;
	this.check = function(Mario) {
		var leftEdge = Mario.x, rightEdge = Mario.x + Mario.width;
		var topEdge = Mario.y, bottomEdge = Mario.y + Mario.height;
		var anyCollisions = false;
		for (var gameObject from this.objectArray) {
			if (rightEdge > gameObject.leftEdge && leftEdge < gameObject.rightEdge) {
				if (bottomEdge > gameObject.topEdge && topEdge < gameObject.bottomEdge) {
					gameObject.triggerCollision();
					Mario.triggerCollision();
					anyCollisions = true;
				}
			}
		}
		return anyCollisions;
	}
}

// Make a mario for testing
function Mario() {
	this.x = 50;
	this.y = 90;
	this.width = 10;
	this.height = 10;
	this.triggerCollision = function() {
		console.log('mario says there\'s a collision');
	}
}

// Make a bad guy for testing
function FakeBaddie1(name, x, y, width, height) {
	if (!name || !x || !y || !width || !height) {
		console.log('all five parameters are required');
	}
	this.leftEdge = x;
	this.rightEdge = x + width;
	this.topEdge = y;
	this.bottomEdge = y + height;
	this.move_right = function() {
		this.x += 5;
	}
	this.triggerCollision() = {
		console.log('fake baddie says there\'s a collision');
	}
}

