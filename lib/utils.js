module.exports.createEventStorePayload = function(data) {
	return {
		sensor: "http://example.edu/sensor",
		sendTime: new Date().toISOString(),
		data: data
	};
};
