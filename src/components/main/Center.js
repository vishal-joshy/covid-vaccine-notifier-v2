const createCenter = (dataArray) => {
	let sessionFilteredDataArray = [];
	dataArray.forEach((center) => {
		const newSessions = filterEmptySessions(center.sessions);
		center.sessions = newSessions;
		sessionFilteredDataArray.push(center);
	});
	console.log('sessionFilter ', sessionFilteredDataArray);
	const filteredDataArray = sessionFilteredDataArray.filter(
		(center) => center.sessions.length !== 0
	);
	console.log('filtered data', filteredDataArray);
	let finalArray = [];
	filteredDataArray.forEach((data) => {
		finalArray.push(centerFactory(data));
	});
	console.log(finalArray);
	return finalArray;
};
const filterEmptySessions = (sessions) => {
	const newSessions = sessions.filter((session) => session.available_capacity > 0); //Remove empty sessions
	return newSessions;
};

const centerFactory = (center) => {
	return {
		generalDetails: {
			name: center.name,
			address: center.address,
			pincode: center.pincode,
			block: center.block_name,
		},
		sessions: center.sessions,
	};
};

export { createCenter };
