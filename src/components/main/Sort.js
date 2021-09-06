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

export { sortCentersByDate, sortCentersByName };
