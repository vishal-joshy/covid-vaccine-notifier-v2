import React, { useEffect, useState } from 'react';
import createVaccineCenterList from './Center';
import CenterDisplay from './CenterDisplay';

function VaccineCenterList() {
	const [vaccineCenters, setVaccineCenters] = useState([]);
	const [filters, setFilters] = useState({ age: 0, vaccine: 'all' });

	// useEffect(() => {					//Call APi with Delay
	// 	console.log('useEffect API Fetch with interval 5000')
	// 	setInterval(()=>{getDataFromApi()} , 5000);
	// 	return () => {
	// 	}
	// }, [])

	useEffect(() => {
		//FOr testing
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
			//Taking only 6 centers
			const tempList = [
				apiData.centers[0],
				apiData.centers[1],
				apiData.centers[2],
				apiData.centers[3],
				apiData.centers[4],
				apiData.centers[5],
			];
			// const centerList = Center.createVaccineCenterList(tempList);
			const centerList = createVaccineCenterList(apiData.centers);
			setVaccineCenters(centerList);
		} catch (err) {
			console.log(err);
		}
	};

	const handleFilterButtons = (vaccine = 'all', age = 0) => {
		console.log(age, vaccine);
	};

	return (
		<div className='VaccineCenterList'>
			<button onClick={getDataFromApi}>GetData</button>
			<div>
				Filters : Age:{' '}
				<button
					onClick={() => {
						handleFilterButtons('all', 18);
					}}>
					18
				</button>
				<button
					onClick={() => {
						handleFilterButtons('all', 40);
					}}>
					40
				</button>
				<button
					onClick={() => {
						handleFilterButtons('all', 45);
					}}>
					45
				</button>
				Vaccine:
				<button
					onClick={() => {
						handleFilterButtons('covishield');
					}}>
					Covishield
				</button>
				<button
					onClick={() => {
						handleFilterButtons('covaxin');
					}}>
					Covaxin
				</button>
				<button
					onClick={() => {
						handleFilterButtons('Sputnik');
					}}>
					Sputnik
				</button>
			</div>
			<CenterDisplay vaccineCenters={vaccineCenters} />
		</div>
	);
}

export default VaccineCenterList;
