const APIFetcher = require('./index.js');

const apis = [
	{
		name: "Promise which errors",
		call: {
			func: promiseWhichRejects.bind(null, "hi"),
			type: "promise"
		},
		startDelay: 0,
		retryTime: 3000,
		refreshTime: 10000,
		errorObjects: ['error'],
		customCalls: (response) => {
			return response;
		}
	},
	{
		name: "Promise which is successful",
		call: {
			func: promiseWhichResolves.bind(null, "hi"),
			type: "promise"
		},
		startDelay: 0,
		retryTime: 3000,
		refreshTime: 10000,
		errorObjects: ['error'],
		customCalls: (response) => {
			return response;
		}
	},
	{
		name: "Callback which errors",
		call: {
			func: callbackWhichErrors.bind(null, "hi"),
			type: "callback"
		},
		startDelay: 0,
		retryTime: 3000,
		refreshTime: 10000,
		errorObjects: ['error'],
		customCalls: (response) => {
			return response;
		}
	},
	{
		name: "Callback which is successful",
		call: {
			func: callbackWhichIsSuccessful.bind(null, "hi"),
			type: "callback"
		},
		startDelay: 0,
		retryTime: 3000,
		refreshTime: 10000,
		errorObjects: ['error'],
		customCalls: (response) => {
			return response;
		}
	},
];

const apiFetcher = new APIFetcher(apis);

/**
 * Good to see what's going on behind the scenes
 */
apiFetcher.on('log', (type, log) => {
	//console.log(log);
});

/**
 * Is the output of the response for a specific api
 */
apiFetcher.on('Promise which is successful', (err, data) => {
	if (err)
		return console.log("Error ", err);

	console.log("Got data", data);
});

apiFetcher.on('Promise which errors', (err, data) => {
	if (err)
		return console.log("Error ", err);
		
	console.log("Got data", data);
});

// Add the error emitter before starting otherwise it will crash
apiFetcher.start();

function promiseWhichRejects(input) {
	return new Promise((resolve, reject) => {
		reject(new Error('This rejected on purpose'));
	});
}

function promiseWhichResolves(input) {
	return new Promise((resolve, reject) => {
		resolve({'something':input});
	});
}

function callbackWhichErrors(input, callback) {
	callback(new Error("Error"), null);
}

function callbackWhichIsSuccessful(input, callback) {
	callback(null, {'something': input});
}