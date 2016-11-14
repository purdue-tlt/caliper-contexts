const expect = require('chai').expect;
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: false});
const _ = require('lodash');
const utils = require('../lib/utils');
const schema = require('../lib/schema');
const fixtures = require('../lib/fixtures');

function validate(data) {
	return ajv.validate(schema, utils.createEventStorePayload(data));
}

function invalidTest(testName, event) {
	it(testName, function * () {
		expect(validate([event])).to.be.false;
	});
}

function eventTests(name, event) {
	describe(name + ' event', function () {
		it('default is valid', function * () {
			expect(validate([event])).to.be.true;
		});
		if (fixtures.invalidEventsByName.hasOwnProperty(name)) {
			describe('invalid tests', function () {
				const invalidEvents = fixtures.invalidEventsByName[name];
				for (var testName in invalidEvents) {
					if (invalidEvents.hasOwnProperty(testName)) {
						invalidTest(testName, invalidEvents[testName]);
					}
				}
			});
		}
	});
}

describe('events', function () {
	it('all events payload is valid', function * () {
		expect(validate(fixtures.events)).to.be.true;
	});

	for (var name in fixtures.eventsByName) {
		if (fixtures.eventsByName.hasOwnProperty(name)) {
			eventTests(name, fixtures.eventsByName[name]);
		}
	}
});

describe('entities', function () {
	it('all entities payload is valid', function * () {
		expect(validate(fixtures.entities)).to.be.true;
	});
	for (var i = 0; i < fixtures.entities.length; i++) {
		const entity = fixtures.entities[i];
		it('entity is valid', function * () {
			const valid = validate([entity]);
			if (!valid) {
				console.log(entity);
			}
			expect(valid).to.be.true;
		});
	}
});
