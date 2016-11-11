const expect = require('chai').expect;
const Ajv = require('ajv');
const ajv = new Ajv({
	//allErrors: true
});
const utils = require('../lib/utils');
const schema = require('../lib/schema');
const events = require('../lib/events');

function eventTest(key, event) {
	describe(key + ' event', function () {
		it('default is valid', function * () {
			var valid = ajv.validate(schema, utils.createEventStorePayload([event]));
			//console.error(ajv.errorsText());
			expect(valid).to.be.true;
		});
	});
}

for (var key in events) {
	if (events.hasOwnProperty(key)) {
		eventTest(key, events[key]);
	}
}

describe('all events in payload', function () {
	it('is valid', function * () {
		var allEvents = Object.keys(events).map(key => events[key]);
		var valid = ajv.validate(schema, utils.createEventStorePayload(allEvents));
		//console.error(ajv.errorsText());
		expect(valid).to.be.true;
	});
});
