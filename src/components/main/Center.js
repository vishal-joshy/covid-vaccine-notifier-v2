const createVaccineCenterList = (apiData) => {
	let sessionFilteredCenters = [];
	apiData.forEach((center) => {
		const newSessions = removeEmptySessions(center.sessions);
		center.sessions = newSessions;
		sessionFilteredCenters.push(center);
	});
	console.log('sessionFilter ', sessionFilteredCenters);
	const filteredCenters = sessionFilteredCenters.filter(
		(center) => center.sessions.length !== 0 //Remove centers with 0 sessions
	);
	console.log('filtered data', filteredCenters);
	return filteredCenters;
};
const removeEmptySessions = (sessions) => {
	const newSessions = sessions.filter((session) => session.available_capacity > 0);
	return newSessions;
};

export { createVaccineCenterList };
