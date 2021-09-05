import React, { useEffect, useState } from 'react';
import { createVaccineCenterList } from './Center';
import Center from './CenterDisplay';

function VaccineCenterList() {
	const [vaccineCenters, setVaccineCenters] = useState([])

	// useEffect(() => {
	// 	console.log('useEffect API Fetch with interval 5000')
	// 	setInterval(()=>{getVaccineDataFromApi()} , 5000);
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
			addVaccineCenters([
				apiData.centers[0],
				apiData.centers[1],
				apiData.centers[2],
				apiData.centers[3],
				apiData.centers[4],
				apiData.centers[5],
			]);
		} catch (err) {
			console.log(err);
		}
	};
	const addVaccineCenters = (apiData) => {
		const centerList = createVaccineCenterList(apiData);
		console.log(centerList);
		setVaccineCenters(centerList);
	};

	return (
		<div className='VaccineCenterList'>
			<button onClick={getDataFromApi}>GetData</button>
			<Center data={vaccineCenters} />
		</div>
	);
}

export default VaccineCenterList;
