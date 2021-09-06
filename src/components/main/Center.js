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

const sortCentersByName = (centers) => {
	return centers.sort((a, b) => {
		if (a.name < b.name) {
			return -1;
		}
		if (a.name > b.name) {
			return 1;
		}
		return 0;
	});
};

const sortCentersByDate = (centers) => {
	return centers.sort((a, b) => {
		return new Date(a.sessions[0].date) - new Date(b.sessions[0].date);
	});
};

const sortCentersBy = (userSortSelection, centers) => {
	console.log(userSortSelection);

	switch (userSortSelection) {
		case 'date':
			const dateSorted = sortCentersByDate(centers);
			return dateSorted;
		case 'name':
			const nameSorted = sortCentersByName(centers);
			return nameSorted;
		default:
			return centers;
	}
};

export { sortCentersBy, createVaccineCenterList };
