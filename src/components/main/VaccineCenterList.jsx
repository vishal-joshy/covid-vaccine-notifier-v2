import React, { useEffect, useState } from 'react';
import Center from './Center';
import CenterDisplay from './CenterDisplay';

function VaccineCenterList() {
	const [vaccineCenters, setVaccineCenters] = useState([]);

	// useEffect(() => {
	// 	console.log('useEffect API Fetch with interval 5000')
	// 	setInterval(()=>{getDataFromApi()} , 5000);
	// 	return () => {
	// 	}
	// }, [])

	useEffect(() => {
		console.log('useEffect Dependency = vaccineCenterData');
		console.log(vaccineCenters);
		return () => {};
	}, [vaccineCenters]);

	const getDataFromApi = async () => {
		console.log('Vaccine Api fetch ');
		try {
			const response = await fetch(
				`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=307&date=02-09-2021`,
				{
					mode: 'cors',
				}
			);
			const apiData = await response.json();
			console.log('setHospital data');
			console.log(apiData.centers[0]);
			// addVaccineCenters([
			// 	//Only 6 centers for testing
			// 	apiData.centers[0],
			// 	apiData.centers[1],
			// 	apiData.centers[2],
			// 	apiData.centers[3],
			// 	apiData.centers[4],
			// 	apiData.centers[5],
			// ]);
			addVaccineCenters(apiData.centers);
		} catch (err) {
			console.log(err);
		}
	};
	const addVaccineCenters = (apiData) => {
		const centerList = Center.createVaccineCenterList(apiData);
		console.log(centerList);
		setVaccineCenters(centerList);
	};

	const sortByName = () => {
		const sortedByName = Center.sortCentersByName([...vaccineCenters]);
		console.log('sorted by name ');
		console.log(sortedByName[0]);
		setVaccineCenters(sortedByName);
	};

	return (
		<div className='VaccineCenterList'>
			<button onClick={getDataFromApi}>GetData</button>
			<CenterDisplay data={vaccineCenters} sortByName={() => sortByName()} />
		</div>
	);
}

export default VaccineCenterList;