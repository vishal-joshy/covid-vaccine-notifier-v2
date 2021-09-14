const createVaccineCenterList = (apiData) => {
	let sessionFilteredCenters = [];
	apiData.forEach((center) => {
		const newSessions = removeEmptySessions([...center.sessions]);
		center.sessions = newSessions;
		sessionFilteredCenters.push(center);
	});
	const filteredCenters = sessionFilteredCenters.filter(
		(center) => center.sessions.length !== 0 //Remove centers with 0 sessions
	);
	return filteredCenters;
};

const removeEmptySessions = (sessions) => {
	const newSessions = sessions.filter((session) => session.available_capacity > 0);
	return newSessions;
};

export {createVaccineCenterList};
