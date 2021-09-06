const filterAge = (ageFilter, centers) => {
	console.log('ageFilter', centers);
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
const filterVaccine = (vaccineFilter, centers) => {};

export { filterAge, filterVaccine };
