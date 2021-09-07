import React, { useEffect, useState } from 'react';
import createVaccineCenterList from './Center';
import CenterDisplay from './CenterDisplay';
import { filterAge, filterVaccine } from './Filter';

function VaccineCenterList() {
	const [vaccineCenters, setVaccineCenters] = useState([]);
	const [ageFilter, setAgeFilter] = useState(0);
	const [vaccineFilter, setVaccineFilter] = useState('ALL');
	const [filteredVaccineCenters, setFilteredVaccineCenters] = useState([]);

	// useEffect(() => {					//Call APi with Delay
	// 	console.log('useEffect API Fetch with interval 5000')
	// 	setInterval(()=>{getDataFromApi()} , 5000);
	// 	return () => {
	// 	}
	// }, [])

	// useEffect(() => {
	// 	//FOr testing
	// 	console.log('useEffect Dependency = vaccineCenterData');
	// 	console.log(vaccineCenters);
	// 	return () => {};
	// }, [vaccineCenters]);

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
			//Taking only 6 centers
			const tempList = [
				apiData.centers[0],
				apiData.centers[1],
				apiData.centers[2],
				apiData.centers[3],
				apiData.centers[4],
				apiData.centers[5],
			];
			// const centerList = createVaccineCenterList(tempList);
			const centerList = createVaccineCenterList(apiData.centers);
			setVaccineCenters(centerList);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		const filteredData = filterVaccine(vaccineFilter, filterAge(ageFilter, [...vaccineCenters]));
		setFilteredVaccineCenters(filteredData);
	}, [ageFilter, vaccineFilter, vaccineCenters]);

	return (
		<div className='VaccineCenterList'>
			<button onClick={getDataFromApi}>GetData</button>
			<div>
				Filters : Age:{' '}
				<button
					onClick={() => {
						setAgeFilter(0);
					}}>
					All
				</button>
				<button
					onClick={() => {
						setAgeFilter(18);
					}}>
					18
				</button>
				<button
					onClick={() => {
						setAgeFilter(40);
					}}>
					40
				</button>
				<button
					onClick={() => {
						setAgeFilter(45);
					}}>
					45
				</button>
				Vaccine:
				<button
					onClick={() => {
						setVaccineFilter('ALL');
					}}>
					All
				</button>
				<button
					onClick={() => {
						setVaccineFilter('COVISHIELD');
					}}>
					Covishield
				</button>
				<button
					onClick={() => {
						setVaccineFilter('COVAXIN');
					}}>
					Covaxin
				</button>
				<button
					onClick={() => {
						setVaccineFilter('SPUTNIK V');
					}}>
					Sputnik
				</button>
			</div>
			<CenterDisplay vaccineCenters={filteredVaccineCenters} />
		</div>
	);
}

export default VaccineCenterList;
