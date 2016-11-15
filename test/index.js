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
		it(`entity of @type="${entity['@type']}" is valid`, function * () {
			const valid = validate([entity]);
			if (!valid) {
				console.log(JSON.stringify(entity, null, 2));
				console.log(JSON.stringify(ajv.errors, null, 2));
			}
			expect(valid).to.be.true;
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
