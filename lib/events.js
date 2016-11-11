const pathRoot = './caliper-common-fixtures-public/src/test/resources/fixtures/';
module.exports = {
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
