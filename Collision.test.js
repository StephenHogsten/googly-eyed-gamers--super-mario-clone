const Collision = require('./collision.js');

// Make a mario for testing
function Mario(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width || 10;
	this.height = height || 10;
	this.messages = [];
	this.triggerCollision = function(collidesWith) {
		this.messages.push('mario collided with ' + (typeof(collidesWith) === 'string'? collidesWith: collidesWith.name));
	}
	this.clearMessages = function() {
		this.messages = [];
	}
}

// Make a bad guy constructor for testing
function FakeBaddie(name, x, y, width, height) {
	if (!name || !x || !y || !width || !height) {
		console.log('all five parameters are required');
	}
	this.name = name;
	this.leftEdge = x;
	this.rightEdge = x + width;
	this.topEdge = y;
	this.bottomEdge = y + height;
	this.move_right = function() {
		this.x += 5;
	}
	this.triggerCollision = function(collidesWith) {
		// nothing
	}
}

// make a tile array?
var array = [
	new FakeBaddie('alfred', 10, 10, 10, 10),
	new FakeBaddie('barty', 40, 10, 10, 10),
	new FakeBaddie('charles', 80, 10, 10, 10),
	new FakeBaddie('richard', 40, 90, 10, 10)
];

var collision = new Collision(array, 100, 100);

describe('Set-up', () => {
	test('objectArray has 4 baddies', () => {
		expect(collision.objectArray.length).toBe(4);
	});
});
describe('Mario straddling left wall triggers collision', () => {
	let mario = new Mario(-5, 15);
	test('one collision', () => {
		expect(collision.check(mario)).toBe(1);
	});
	test('one collision message', () => {
		expect(mario.messages.length).toBe(1);
	});
	test('mario collided with left wall', () => {
		expect(mario.messages).toEqual(['mario collided with left wall']);
	});
});
describe('Mario hits alfred when inside', () => {
	let mario = new Mario(15, 15, 5, 5);
	collision.check(mario);
	test('mario collided with alfred', () => {
		expect(mario.messages).toEqual(['mario collided with alfred']);
	});	
});
describe('Mario collides with no one while too low', () => {
	let mario = new Mario(15, 55, 5, 5);
	collision.check(mario);
	test('mario has no collisions', () => {
		expect(mario.messages.length).toBe(0);
	});
});
describe('Mario collides with barty and richard with corner overlap', () => {
	let mario = new Mario(45, 15, 10, 80);
	collision.check(mario);
	test('mario had two collisions', () => {
		expect(mario.messages.length).toBe(2);
	});
	test('mario hit barty', () => {
		expect(mario.messages.includes('mario collided with barty')).toBe(true);
	});
	test('mario hit richard', () => {
		expect(mario.messages.includes('mario collided with richard')).toBe(true);
	});
});
describe('Mario collides with top wall, right wall, and charles (corner)', () => {
	let mario = new Mario(85, -5, 20, 20);
	collision.check(mario);
	test('mario had three collisions', () => {
		expect(mario.messages.length).toBe(3);
	});
	test('mario hit charles', () => {
		expect(mario.messages.includes('mario collided with charles')).toBe(true);
	});
	test('mario hit top wall', () => {
		expect(mario.messages.includes('mario collided with top wall')).toBe(true);
	});
	test('mario hit right wall', () => {
		expect(mario.messages.includes('mario collided with right wall')).toBe(true);
	});
});