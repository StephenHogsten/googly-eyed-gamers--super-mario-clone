'use strict'
console.log('me');

// 0,0 is upper left corner
// height goes down, width goes to the right
// height of world is 100

// for each object in the object array, check() expects: leftEdge, rightEdge, bottomEdge, topEdge to all be populated, and a triggerCollision method 
//	same goes for Mario (or whichever object is passed in)

function Collision(objectArray, worldHeight, worldWidth) {
	this.objectArray = objectArray;
	this.check = function(Mario) {
		// set-up some variables
		var leftEdge = Mario.x, rightEdge = Mario.x + Mario.width;
		var topEdge = Mario.y, bottomEdge = Mario.y + Mario.height;
		var collisionCount = 0;
		
		// check world borders
		if (leftEdge < 0) {	
			collisionCount++;
			Mario.triggerCollision('left wall') 
		} else if (rightEdge> worldWidth) { 
			collisionCount++;
			Mario.triggerCollision('right wall') 
		}
		if (topEdge < 0) { 
			collisionCount++;
			Mario.triggerCollision('top wall') 
		} else if (bottomEdge > worldHeight) { 
			collisionCount++;
			Mario.triggerCollision('bottom wall') 
		}
		
		// loop through game objects
		for (var gameObject of this.objectArray) {
			if (rightEdge > gameObject.leftEdge && leftEdge < gameObject.rightEdge) {
				if (bottomEdge > gameObject.topEdge && topEdge < gameObject.bottomEdge) {
					gameObject.triggerCollision(Mario);
					Mario.triggerCollision(gameObject);
					collisionCount++;
				}
			}
		}
		return collisionCount;
	}
}

module.exports = Collision;

