const _ = require('lodash');
const pathRoot = './caliper-common-fixtures-public/src/test/resources/fixtures/';

// Missing Examples
// TODO: AssessmentEvent: Paused/Restarted/Submitted
// TODO: AssessmentItemEvent: Skipped/Viewed, Reviewed
// TODO: AssignableEvent: all but Activated
// TODO: MediaEvent: all but Paused

const eventsByName = {
	minimal: require(pathRoot + 'caliperEnvelopeEventViewViewedMinimal.json').data[0],
	sessionLogin: require(pathRoot + 'caliperSessionLoginEvent.json'),
	sessionLogout: require(pathRoot + 'caliperSessionLogoutEvent.json'),
	sessionTimeout: require(pathRoot + 'caliperSessionTimeoutEvent.json'),
	navigation: require(pathRoot + 'caliperNavigationEvent.json'),
	view: require(pathRoot + 'caliperViewEvent.json'),
	bookmarkAnnotation: require(pathRoot + 'caliperBookmarkAnnotationEvent.json'),
	highlightAnnotation: require(pathRoot + 'caliperHighlightAnnotationEvent.json'),
	sharedAnnotation: require(pathRoot + 'caliperSharedAnnotationEvent.json'),
	tagAnnotation: require(pathRoot + 'caliperTagAnnotationEvent.json'),
	assessment: require(pathRoot + 'caliperAssessmentEvent.json'),
	assessmentItemStarted: require(pathRoot + 'caliperAssessmentItemStartedEvent.json'),
	assessmentItemCompleted: require(pathRoot + 'caliperAssessmentItemCompletedEvent.json'),
	assignable: require(pathRoot + 'caliperAssignableEvent.json'),
	outcome: require(pathRoot + 'caliperAssessmentOutcomeEvent.json'),
	media: require(pathRoot + 'caliperMediaEvent.json'),
};

const testEntityProperties = {
	entity: {
		'@id': {
			required: true,
			notNull: true,
			type: 'uri'
		},
		'@type': {
			knownValue: true
		}
	}
};
const testEventProperties = {
	event: {
		'@context': {
			required: true,
			notNull: true,
			type: 'uri',
			knownValue: true
		},
		'@type': {
			required: true,
			notNull: true,
			type: 'uri',
			knownValue: true
		},
		actor: {
			required: true,
			notNull: true,
			type: 'object'
		},
		action: {
			required: true,
			notNull: true,
			type: 'uri',
			knownValue: true
		},
		object: {
			required: true,
			notNull: true,
			type: 'object'
		},
		generated: {
			required: false,
			notNull: false,
			type: 'object'
		},
		target: {
			required: false,
			notNull: false,
			type: 'object'
		},
		edApp: {
			required: false,
			notNull: false,
			type: 'object'
		},
		group: {
			required: false,
			notNull: false,
			type: 'object'
		},
		membership: {
			required: false,
			notNull: false,
			type: 'object'
		},
		eventTime: {
			required: true,
			notNull: true,
			type: 'date'
		}
	},
	minimal: {
		'@type': {
			matchSpecificEventType: 'http://purl.imsglobal.org/caliper/v1/Event'
		}
	},
	sessionLogin: {
		'@type': {
			matchSpecificEventType: 'http://purl.imsglobal.org/caliper/v1/SessionEvent'
		},
		action: {
			matchSpecificAction: 'http://purl.imsglobal.org/caliper/v1/action#LoggedIn'
		},
		object: {
			type: 'object',
			properties: {
				'@type': {
					matchSpecificEntityType: 'http://purl.imsglobal.org/caliper/v1/SoftwareApplication'
				}
			}
		},
		generated: {
			type: 'object',
			notNull: false,
			properties: {
				'@type': {
					matchSpecificEntityType: 'http://purl.imsglobal.org/caliper/v1/Session'
				},
				startedAtTime: {
					required: true,
					type: 'date'
				}
			}
		}
	},
	sessionLogout: {
		'@type': {
			matchSpecificEventType: 'http://purl.imsglobal.org/caliper/v1/SessionEvent'
		},
		action: {
			matchSpecificAction: 'http://purl.imsglobal.org/caliper/v1/action#LoggedOut'
		},
		object: {
			type: 'object',
			properties: {
				'@type': {
					matchSpecificEntityType: 'http://purl.imsglobal.org/caliper/v1/Session'
				},
				endedAtTime: {
					required: true,
					type: 'date'
				}
			}
		}
	},
	sessionTimeout: {
		'@type': {
			matchSpecificEventType: 'http://purl.imsglobal.org/caliper/v1/SessionEvent'
		},
		action: {
			matchSpecificAction: 'http://purl.imsglobal.org/caliper/v1/action#TimedOut'
		},
		object: {
			type: 'object',
			properties: {
				'@type': {
					matchSpecificEntityType: 'http://purl.imsglobal.org/caliper/v1/Session'
				},
				endedAtTime: {
					required: true,
					type: 'date'
				}
			}
		}
	},
	navigation: {
		'@type': {
			matchSpecificEventType: 'http://purl.imsglobal.org/caliper/v1/NavigationEvent'
		},
		action: {
			matchSpecificAction: 'http://purl.imsglobal.org/caliper/v1/action#NavigatedTo'
		}
	},
	view: {
		'@type': {
			matchSpecificEventType: 'http://purl.imsglobal.org/caliper/v1/ViewEvent'
		},
		action: {
			matchSpecificAction: 'http://purl.imsglobal.org/caliper/v1/action#Viewed'
		}
	},
	bookmarkAnnotation: {
		'@type': {
			matchSpecificEventType: 'http://purl.imsglobal.org/caliper/v1/AnnotationEvent'
		},
		action: {
			matchSpecificAction: 'http://purl.imsglobal.org/caliper/v1/action#Bookmarked'
		},
		generated: {
			required: true,
			notNull: true,
			type: 'object',
			properties: {
				'@type': {
					matchSpecificEntityType: 'http://purl.imsglobal.org/caliper/v1/BookmarkAnnotation'
				}
			}
		}
	},
	highlightAnnotation: {
		'@type': {
			matchSpecificEventType: 'http://purl.imsglobal.org/caliper/v1/AnnotationEvent'
		},
		action: {
			matchSpecificAction: 'http://purl.imsglobal.org/caliper/v1/action#Highlighted'
		},
		generated: {
			required: true,
			notNull: true,
			type: 'object',
			properties: {
				'@type': {
					matchSpecificEntityType: 'http://purl.imsglobal.org/caliper/v1/HighlightAnnotation'
				}
			}
		}
	},
	sharedAnnotation: {
		'@type': {
			matchSpecificEventType: 'http://purl.imsglobal.org/caliper/v1/AnnotationEvent'
		},
		action: {
			matchSpecificAction: 'http://purl.imsglobal.org/caliper/v1/action#Shared'
		},
		generated: {
			required: true,
			notNull: true,
			type: 'object',
			properties: {
				'@type': {
					matchSpecificEntityType: 'http://purl.imsglobal.org/caliper/v1/SharedAnnotation'
				}
			}
		}
	},
	tagAnnotation: {
		'@type': {
			matchSpecificEventType: 'http://purl.imsglobal.org/caliper/v1/AnnotationEvent'
		},
		action: {
			matchSpecificAction: 'http://purl.imsglobal.org/caliper/v1/action#Tagged'
		},
		generated: {
			required: true,
			notNull: true,
			type: 'object',
			properties: {
				'@type': {
					matchSpecificEntityType: 'http://purl.imsglobal.org/caliper/v1/TagAnnotation'
				}
			}
		}
	},
	assessment: {
		'@type': {
			matchSpecificEventType: 'http://purl.imsglobal.org/caliper/v1/AssessmentEvent'
		},
		action: {
			matchSpecificAction: 'http://purl.imsglobal.org/caliper/v1/action#Started'
		},
		generated: {
			required: true,
			notNull: true,
			type: 'object',
			properties: {
				'@type': {
					matchSpecificEntityType: 'http://purl.imsglobal.org/caliper/v1/Attempt'
				}
			}
		}
	},
	assessmentItemStarted: {
		'@type': {
			matchSpecificEventType: 'http://purl.imsglobal.org/caliper/v1/AssessmentItemEvent'
		},
		action: {
			matchSpecificAction: 'http://purl.imsglobal.org/caliper/v1/action#Tagged'
		},
		object: {
			type: 'object',
			properties: {
				'@type': {
					matchSpecificEntityType: 'http://purl.imsglobal.org/caliper/v1/AssessmentItem'
				}
			}
		},
		generated: {
			required: true,
			notNull: true,
			type: 'object',
			properties: {
				'@type': {
					matchSpecificEntityType: 'http://purl.imsglobal.org/caliper/v1/Attempt'
				}
			}
		}
	},
	assessmentItemCompleted: {
		'@type': {
			matchSpecificEventType: 'http://purl.imsglobal.org/caliper/v1/AssessmentItemEvent'
		},
		action: {
			matchSpecificAction: 'http://purl.imsglobal.org/caliper/v1/action#Completed'
		},
		target: {
			notNull: false,
			type: 'object',
			properties: {
				'@type': {
					matchSpecificEntityType: 'http://purl.imsglobal.org/caliper/v1/Attempt'
				}
			}
		},
		generated: {
			required: true,
			notNull: true,
			type: 'object'
		}
	},
	assignable: {
		'@type': {
			matchSpecificEventType: 'http://purl.imsglobal.org/caliper/v1/AssignableEvent'
		}
	},
	outcome: {
		'@type': {
			matchSpecificEventType: 'http://purl.imsglobal.org/caliper/v1/OutcomeEvent'
		},
		action: {
			matchSpecificAction: 'http://purl.imsglobal.org/caliper/v1/action#Graded'
		},
		object: {
			type: 'object',
			properties: {
				'@type': {
					matchSpecificEntityType: 'http://purl.imsglobal.org/caliper/v1/Attempt'
				}
			}
		},
		target: {
			required: true,
			notNull: true,
			type: 'object'
		},
		generated: {
			required: true,
			notNull: true,
			type: 'object',
			properties: {
				'@type': {
					matchSpecificEntityType: 'http://purl.imsglobal.org/caliper/v1/Result'
				}
			}
		}
	},
	media: {
		'@type': {
			matchSpecificEventType: 'http://purl.imsglobal.org/caliper/v1/MediaEvent'
		}
	}
};

function getValidActionNotMatchingAction(action) {
	const one = 'http://purl.imsglobal.org/vocab/caliper/v1/action#OpenedPopout';
	const two = 'http://purl.imsglobal.org/vocab/caliper/v1/action#LoggedIn';
	return action !== one ? one : two;
}

function getValidEventTypeNotMatchingType(type) {
	const one = 'http://purl.imsglobal.org/caliper/v1/AssessmentEvent';
	const two = 'http://purl.imsglobal.org/caliper/v1/SessionEvent';
	return type !== one ? one : two;
}

function getValidEntityTypeNotMatchingType(type) {
	const one = 'http://purl.imsglobal.org/caliper/v1/Session';
	const two = 'http://purl.imsglobal.org/caliper/v1/lis/SoftwareApplication';
	return type !== one ? one : two;
}

function getInvalidClonesForProperty(obj, propertyName, propertyInfo) {
	let invalidClones = {};
	let o = _.merge({}, obj);

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

	if (propertyInfo.hasOwnProperty('knownValue') && propertyInfo.knownValue) {
		o = _.merge({}, obj);
		o[propertyName] = 'not a known value';
		invalidClones[propertyName + ' must match a known value'] = o;
	}

	if (propertyInfo.hasOwnProperty('matchSpecificEntityType')) {
		o = _.merge({}, obj);
		o[propertyName] = getValidEntityTypeNotMatchingType(propertyInfo.matchSpecificEntityType);
		invalidClones[propertyName + ' must match ' + (propertyInfo.matchSpecificEntityType || 'a known entity type')] = o;
	}
	if (propertyInfo.hasOwnProperty('matchSpecificEventType')) {
		o = _.merge({}, obj);
		o[propertyName] = getValidEntityTypeNotMatchingType(propertyInfo.matchSpecificEventType);
		invalidClones[propertyName + ' must match ' + (propertyInfo.matchSpecificEventType || 'a known event type')] = o;
	}
	if (propertyInfo.hasOwnProperty('matchSpecificAction')) {
		o = _.merge({}, obj);
		o[propertyName] = getValidActionNotMatchingAction(propertyInfo.matchSpecificAction);
		invalidClones[propertyName + ' must match ' + (propertyInfo.matchSpecificAction || 'a known action')] = o;
	}

	if (propertyInfo.hasOwnProperty('type') && propertyInfo.type === 'object') {
		o = _.merge({}, obj);
		const subObj = o[propertyName];

		// default entity properties
		const invalidPropertyClones = getInvalidClones(subObj, testEntityProperties.entity);
		for (var invalidPropertyName in invalidPropertyClones) {
			if (invalidPropertyClones.hasOwnProperty(invalidPropertyName)) {
				o = _.merge({}, obj);
				o[propertyName] = invalidPropertyClones[invalidPropertyName];
				invalidClones[propertyName + '.' + invalidPropertyName] = o;
			}
		}

		// specific entity properties
		if (propertyInfo.hasOwnProperty('properties')) {
			const invalidPropertyClones = getInvalidClones(subObj, propertyInfo.properties);
			for (var invalidPropertyName in invalidPropertyClones) {
				if (invalidPropertyClones.hasOwnProperty(invalidPropertyName)) {
					o = _.merge({}, obj);
					o[propertyName] = invalidPropertyClones[invalidPropertyName];
					invalidClones[propertyName + '.' + invalidPropertyName] = o;
				}
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

const invalidEventTestsByName = Object.keys(eventsByName).reduce((retval, eventName) => {
	const event = eventsByName[eventName];
	let invalidClones = getInvalidClones(event, testEventProperties.event);
	if (testEventProperties.hasOwnProperty(eventName)) {
		invalidClones = _.merge({}, invalidClones, getInvalidClones(event, testEventProperties[eventName]));
	}
	retval[eventName] = invalidClones;
	return retval;
}, {});

const events = Object.keys(eventsByName).map(key => eventsByName[key]);
const invalidEventTests = Object.keys(invalidEventTestsByName).map(key => invalidEventTestsByName[key]);

const entitiesById = events.reduce((retval, curr) => {
	var objectsById = Object.keys(curr).reduce((objs, key) => {
		var obj = curr[key];
		if (obj !== null && typeof obj === 'object' && obj.hasOwnProperty('@id')) {
			objs[obj['@id']] = obj;
		}
		return objs;
	}, {});
	retval = _.merge({}, retval, objectsById);
	return retval;
}, {});
const entities = Object.keys(entitiesById).map(key => entitiesById[key]);

// const invalidEntities = Object.keys(invalidEventTestsByName)
// 	.filter(key => key.indexOf('.') !== -1)
// 	.map(key => invalidEventTestsByName[key])
// 	.reduce((retval, curr) => {
// 	var objects = Object.keys(curr).reduce((objs, key) => {
// 		var obj = curr[key];
// 		if (obj !== null && typeof obj === 'object') {
// 			objs.push(obj);
// 		}
// 		return objs;
// 	}, []);
// 	retval = retval.concat(objects);
// 	return retval;
// }, []);

module.exports = {
	eventsByName,
	invalidEventTestsByName,
	events,
	invalidEventTests,
	entities
};
