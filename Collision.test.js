const Collision = require('./collision.js');

// Make a mario for testing
function Mario(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width || 10;
	this.height = height || 10;
	this.messages = [];
	this.collisionMock = jest.fn();
	this.triggerCollision = function(collidesWith) {
		this.collisionMock(collidesWith);
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
const alfred = new FakeBaddie('alfred', 10, 10, 10, 10),
	barty = new FakeBaddie('barty', 40, 10, 10, 10),
	charles = new FakeBaddie('charles', 80, 10, 10, 10),
	richard = new FakeBaddie('richard', 40, 90, 10, 10);
var array = [alfred, barty, charles, richard];

var collision = new Collision(array, 100, 100);

describe('Set-up', () => {
	test('objectArray has 4 baddies', () => {
		expect(collision.objectArray.length).toBe(4);
	});
	let mockFn = jest.fn();
	test('mockFn is a function', () => {
		expect(typeof(mockFn)).toBe('function');
	});
	mockFn('a');
	test('mockFn was called once', () => {
		expect(mockFn.mock.calls.length).toBe(1);
	});
	test('mockFn was called with \'a\'', () => {
		expect(mockFn.mock.calls[0]).toEqual(['a']);
	});
});
describe('Mario straddling left wall triggers collision', () => {
	let mario = new Mario(-5, 15);
	test('one collision returned', () => {
		expect(collision.check(mario)).toBe(1);
	});
	test('one collision message', () => {
		expect(mario.collisionMock.mock.calls.length).toBe(1);
	});
	test('mario collided with left wall', () => {
		expect(mario.collisionMock.mock.calls).toEqual([['left wall']]);
	});
});
describe('Mario hits alfred when inside', () => {
	let mario = new Mario(15, 15, 5, 5);
	test('one collision returned', () => {
		expect(collision.check(mario)).toBe(1);
	});
	test('mario collided with alfred', () => {
		expect(mario.collisionMock.mock.calls[0][0]).toBe(alfred);
	});	
});
describe('Mario collides with no one while too low', () => {
	let mario = new Mario(15, 55, 5, 5);
	test('no collisions returned', () => {
		expect(collision.check(mario)).toBe(0);
	});
	test('mario has no collisions', () => {
		expect(mario.collisionMock.mock.calls.length).toBe(0);
	});
});
describe('Mario collides with barty and richard with corner overlap', () => {
	let mario = new Mario(45, 15, 10, 80);
	test('two collisions returned', () => {
		expect(collision.check(mario)).toBe(2);
	});
	test('mario hit barty', () => {
		expect(mario.collisionMock.mock.calls[0][0]).toBe(barty);
	});
	test('mario hit richard', () => {
		expect(mario.collisionMock.mock.calls[1][0]).toBe(richard);
	});
});
describe('Mario collides with top wall, right wall, and charles (corner)', () => {
	let mario = new Mario(85, -5, 20, 20);
	test('three collision returned', () => {
		expect(collision.check(mario)).toBe(3);
	});
	test('mario hit right wall', () => {
		expect(mario.collisionMock.mock.calls[0][0]).toBe('right wall');
	});
	test('mario hit top wall', () => {
		expect(mario.collisionMock.mock.calls[1][0]).toBe('top wall');
	});
	test('mario hit charles', () => {
		expect(mario.collisionMock.mock.calls[2][0]).toBe(charles);
	});
});