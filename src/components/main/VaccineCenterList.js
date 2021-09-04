import React, { useEffect, useState } from 'react';
import { createCenter } from './Center';
import Center from './CenterDisplay';

function VaccineCenterList() {
	const [vaccineCenterData, setVaccineCenterData] = useState([]);

	// useEffect(() => {
	// 	console.log('useEffect API Fetch with interval 5000')
	// 	setInterval(()=>{getVaccineDataFromApi()} , 5000);
	// 	return () => {
	// 	}
	// }, [])

	useEffect(() => {
		console.log('useEffect Dependency = vaccineCenterdata');
		console.log(vaccineCenterData);
		return () => {};
	}, [vaccineCenterData]);

	const getVaccineCenterDataFromApi = async () => {
		console.log('Vaccine Api fetch ');
		try {
			const response = await fetch(
				`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=307&date=02-09-2021`,
				{
					mode: 'cors',
				}
			);
			const dataArray = await response.json();
			console.log('setHospital data');
			console.log(dataArray.centers[0]);
			addVaccineCenterDataToState([
				dataArray.centers[0],
				dataArray.centers[1],
				dataArray.centers[2],
				dataArray.centers[3],
				dataArray.centers[4],
				dataArray.centers[5],
			]);
		} catch (err) {
			console.log(err);
		}
	};
	const addVaccineCenterDataToState = (dataArray) => {
		const values = createCenter(dataArray);
		console.log(values);
		setVaccineCenterData(values);
	};

	return (
		<div>
			<button onClick={getVaccineCenterDataFromApi}>GetData</button>
			<Center data={vaccineCenterData} />
		</div>
	);
}

export default VaccineCenterList;
