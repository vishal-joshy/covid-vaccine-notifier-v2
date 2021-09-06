import React, { useEffect, useState } from 'react';
import * as Center from './Center';
import CenterDisplay from './CenterDisplay';

function VaccineCenterList() {
	const [vaccineCenters, setVaccineCenters] = useState([]);

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
			console.log('setHospital data');
			console.log(apiData.centers[0]);
			const centerList = [
				//Only 6 centers for testing
				apiData.centers[0],
				apiData.centers[1],
				apiData.centers[2],
				apiData.centers[3],
				apiData.centers[4],
				apiData.centers[5],
			];

			// const centerList = Center.createVaccineCenterList(apiData.centers)
			setVaccineCenters(centerList);
		} catch (err) {
			console.log(err);
		}
	};

	const sortTableBy = (userSortSelection) => {
		const newValues = Center.sortCentersBy(userSortSelection, [...vaccineCenters]);
		console.log(newValues);
		setVaccineCenters(newValues);
	};

	return (
		<div className='VaccineCenterList'>
			<button onClick={getDataFromApi}>GetData</button>
			<div>
				Filters : Age: <button>18</button>
				<button>40</button>
				<button>45</button>
				Vaccine:<button>Covishield</button>
				<button>Covaxin</button>
				<button>Sputnik</button>
			</div>
			<CenterDisplay data={vaccineCenters} sortTableBy={sortTableBy} />
		</div>
	);
}

export default VaccineCenterList;
