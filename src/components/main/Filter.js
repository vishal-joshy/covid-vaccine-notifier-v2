const filterAge = (ageFilter, centers) => {
	if (ageFilter === 0) {
		return centers;
	}
	const newCenters = centers.filter((center) => {
		if (center.sessions[0].min_age_limit === ageFilter) {
			return center;
		}
		return null;
	});
	return newCenters;
};

const filterVaccine = (vaccineFilter, centers) => {
	if (vaccineFilter === 'ALL') {
		return centers;
	}
	const newCenters = centers.filter((center) => {
		if (center.sessions[0].vaccine === vaccineFilter) {
			return center;
		}
		return null;
	});
	return newCenters;
};

const filterName = (nameFilter, centers) => {
	if (nameFilter === '') {
		return centers;
	}
	const regex = new RegExp(nameFilter, 'gi');
	const newCenters = centers.filter((center) => {
		const match = regex.exec(center.name);
		if (match) {
			return center;
		}
		return null;
	});
	return newCenters;
};

export { filterAge, filterVaccine, filterName };
