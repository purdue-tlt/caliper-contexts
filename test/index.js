const expect = require('chai').expect;
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: false});
const _ = require('lodash');
const utils = require('../lib/utils');
const schema = require('../lib/schema');
const fixtures = require('../lib/fixtures');

/*
 * Event Tests
 */

describe('events', function () {
	it('all events payload is valid', function * () {
		expect(validateData(fixtures.events, true)).to.be.true;
	});

	for (var name in fixtures.eventsByName) {
		if (fixtures.eventsByName.hasOwnProperty(name)) {
			eventTests(name, fixtures.eventsByName[name]);
		}
	}
});

/*
 * Entity Tests
 */

describe('entities', function () {
	it('all entities payload is valid', function * () {
		expect(validateData(fixtures.entities, true)).to.be.true;
	});
	for (var i = 0; i < fixtures.entities.length; i++) {
		const entity = fixtures.entities[i];
		it(`entity of @type="${entity['@type']}" is valid`, function * () {
			expect(validateData([entity], true)).to.be.true;
		});
	}
	// for (var i = 0; i < fixtures.invalidEntities.length; i++) {
	// 	const entity = fixtures.invalidEntities[i];
	// 	it('entity is invalid', function * () {
	// 		const valid = validate([entity]);
	// 		if (valid) {
	// 			console.log(JSON.stringify(entity, null, 2));
	// 			console.log(JSON.stringify(ajv.errors, null, 2));
	// 		}
	// 		expect(valid).to.be.false;
	// 	});
	// }
});


/*
 * EventStore Payload Tests
 */

describe('event store payload', function() {
	const payload = utils.createEventStorePayload([fixtures.events[0]]);
	it('default is valid', function * () {
		expect(validatePayload(payload, true)).to.be.true;
	});

	let p = null;
	it('sensor is required', function * () {
		p = _.merge({}, payload);
		delete p.sensor;
		expect(validatePayload(p, false)).to.be.false;
	});
	it('sensor must not be null', function * () {
		p = _.merge({}, payload);
		p.sensor = null;
		expect(validatePayload(p, false)).to.be.false;
	});
	it('sensor value must be typeof uri', function * () {
		p = _.merge({}, payload);
		p.sensor = 'not a uri value';
		expect(validatePayload(p, false)).to.be.false;
	});

	it('sendTime is required', function * () {
		p = _.merge({}, payload);
		delete p.sendTime;
		expect(validatePayload(p, false)).to.be.false;
	});
	it('sendTime must not be null', function * () {
		p = _.merge({}, payload);
		p.sendTime = null;
		expect(validatePayload(p, false)).to.be.false;
	});
	it('sendTime value must be typeof date', function * () {
		p = _.merge({}, payload);
		p.sendTime = 'not a date value';
		expect(validatePayload(p, false)).to.be.false;
	});

	it('data is required', function * () {
		p = _.merge({}, payload);
		delete p.data;
		expect(validatePayload(p, false)).to.be.false;
	});
	it('data must not be null', function * () {
		p = _.merge({}, payload);
		p.data = null;
		expect(validatePayload(p, false)).to.be.false;
	});
	it('data must have at least one item', function * () {
		p = _.merge({}, payload);
		p.data = [];
		expect(validatePayload(p, false)).to.be.false;
	});
});

/*
 * Shared Functions
 */

function validatePayload(payload, expected) {
	const valid = ajv.validate(schema, payload);
	if (valid !== expected) {
		console.log(JSON.stringify(payload, null, 2));
		console.log(JSON.stringify(ajv.errors, null, 2));
	}
	return valid;
}

function validateData(data, expected) {
	return validatePayload(utils.createEventStorePayload(data), expected);
}

function invalidTest(testName, event) {
	it(testName, function * () {
		expect(validateData([event], false)).to.be.false;
	});
}

function eventTests(name, event) {
	describe(name + ' event', function () {
		it('default is valid', function * () {
			expect(validateData([event], true)).to.be.true;
		});
		if (fixtures.invalidEventTestsByName.hasOwnProperty(name)) {
			describe('invalid tests', function () {
				const invalidEventTests = fixtures.invalidEventTestsByName[name];
				for (var testName in invalidEventTests) {
					if (invalidEventTests.hasOwnProperty(testName)) {
						invalidTest(testName, invalidEventTests[testName]);
					}
				}
			});
		}
	});
}
