const _ = require('lodash');
const pathRoot = './caliper-common-fixtures-public/src/test/resources/fixtures/';

const eventsByName = {
	assessment: require(pathRoot + 'caliperAssessmentEvent.json'),
	assessmentItemCompleted: require(pathRoot + 'caliperAssessmentItemCompletedEvent.json'),
	assessmentItemStarted: require(pathRoot + 'caliperAssessmentItemStartedEvent.json'),
	assessmentOutcome: require(pathRoot + 'caliperAssessmentOutcomeEvent.json'),
	assignable: require(pathRoot + 'caliperAssignableEvent.json'),
	bookmarkAnnotation: require(pathRoot + 'caliperBookmarkAnnotationEvent.json'),
	highlightAnnotation: require(pathRoot + 'caliperHighlightAnnotationEvent.json'),
	media: require(pathRoot + 'caliperMediaEvent.json'),
	navigation: require(pathRoot + 'caliperNavigationEvent.json'),
	sessionLogin: require(pathRoot + 'caliperSessionLoginEvent.json'),
	sessionLogout: require(pathRoot + 'caliperSessionLogoutEvent.json'),
	sessionTimeout: require(pathRoot + 'caliperSessionTimeoutEvent.json'),
	sharedAnnotation: require(pathRoot + 'caliperSharedAnnotationEvent.json'),
	tagAnnotation: require(pathRoot + 'caliperTagAnnotationEvent.json'),
	view: require(pathRoot + 'caliperViewEvent.json')
};

const testEntityProperties = {
	entity: {
		'@id': {
			required: true,
			notNull: true,
			type: 'uri'
		},
		'@type': {
			exactMatch: true
		}
	}
};
const testEventProperties = {
	event: {
		'@context': {
			required: true,
			notNull: true,
			type: 'uri',
			exactMatch: true
		},
		'@type': {
			required: true,
			notNull: true,
			type: 'uri',
			exactMatch: true
		},
		actor: {
			required: true,
			notNull: true,
			type: 'object',
			knownType: true
		},
		action: {
			required: true,
			notNull: true,
			type: 'uri',
			exactMatch: true,
			knownType: true
		},
		object: {
			required: true,
			notNull: true,
			type: 'object',
			knownType: true
		},
		generated: {
			required: false,
			notNull: false,
			type: 'object',
			knownType: true
		},
		target: {
			required: false,
			notNull: false,
			type: 'object',
			knownType: true
		},
		edApp: {
			required: false,
			notNull: false,
			type: 'object',
			knownType: true
		},
		group: {
			required: false,
			notNull: false,
			type: 'object',
			knownType: true
		},
		membership: {
			required: false,
			notNull: false,
			type: 'object',
			knownType: true
		},
		eventTime: {
			required: true,
			notNull: true,
			type: 'date'
		}
	}
};

function getInvalidClonesForProperty(obj, propertyName, propertyInfo) {
	let invalidClones = {};
	let o = obj;
	if (propertyInfo.hasOwnProperty('required') && propertyInfo.required) {
		o = _.merge({}, obj);
		delete o[propertyName];
		invalidClones[propertyName + ' is required'] = o;
	}
	if (propertyInfo.hasOwnProperty('notNull') && propertyInfo.notNull) {
		o = _.merge({}, obj);
		o[propertyName] = null;
		invalidClones[propertyName + ' must not be null'] = o;
	}
	if (propertyInfo.hasOwnProperty('type')) {
		o = _.merge({}, obj);
		if (propertyInfo.type === 'object') {
			o[propertyName] = 'not an object';
		} else if (propertyInfo.type === 'uri') {
			o[propertyName] = 'not a uri value';
		} else if (propertyInfo.type === 'date') {
			o[propertyName] = 'not a date value';
		}
		invalidClones[propertyName + ' value must be typeof ' + propertyInfo.type] = o;
	}
	if (propertyInfo.hasOwnProperty('exactMatch') && propertyInfo.exactMatch) {
		o = _.merge({}, obj);
		o[propertyName] = 'not a known value';
		invalidClones[propertyName + ' must match a known value'] = o;
	}
	if (propertyInfo.hasOwnProperty('type') && propertyInfo.type === 'object') {
		const invalidPropertyClones = getInvalidClones(o[propertyName], testEntityProperties.entity);
		for (var invalidPropertyName in invalidPropertyClones) {
			if (invalidPropertyClones.hasOwnProperty(invalidPropertyName)) {
				o = _.merge({}, obj);
				o[propertyName] = invalidPropertyClones[invalidPropertyName];
				invalidClones[propertyName + '.' + invalidPropertyName] = o;
			}
		}
	}
	return invalidClones;
}

function getInvalidClones(obj, propertiesToTest) {
	let invalidClones = {};
	for (var propertyName in propertiesToTest) {
		if (propertiesToTest.hasOwnProperty(propertyName)) {
			const propertyInfo = propertiesToTest[propertyName];
			invalidClones = _.merge({}, invalidClones, getInvalidClonesForProperty(obj, propertyName, propertyInfo));
		}
	}
	return invalidClones;
}

const invalidEventsByName = Object.keys(eventsByName).reduce((retval, eventName) => {
	const event = eventsByName[eventName];
	retval[eventName] = getInvalidClones(event, testEventProperties.event);
	return retval;
}, {});

const events = Object.keys(eventsByName).map(key => eventsByName[key]);
const invalidEvents = Object.keys(invalidEventsByName).map(key => invalidEventsByName[key]);

const entities = events.reduce((retval, curr) => {
	var objects = Object.keys(curr).reduce((objs, key) => {
		var obj = curr[key];
		if (obj !== null && typeof obj === 'object' && obj.hasOwnProperty('@id')) {
			objs.push(obj);
		}
		return objs;
	}, []);
	retval = retval.concat(objects);
	return retval;
}, []);

const invalidEntities = Object.keys(invalidEventsByName)
	.filter(key => key.includes('.'))
	.map(key => invalidEventsByName[key])
	.reduce((retval, curr) => {
	var objects = Object.keys(curr).reduce((objs, key) => {
		var obj = curr[key];
		if (obj !== null && typeof obj === 'object') {
			objs.push(obj);
		}
		return objs;
	}, []);
	retval = retval.concat(objects);
	return retval;
}, []);

module.exports = {
	eventsByName,
	invalidEventsByName,
	events,
	invalidEvents,
	entities,
	invalidEntities
};
