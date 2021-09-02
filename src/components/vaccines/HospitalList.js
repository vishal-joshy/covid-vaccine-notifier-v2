import React, { useEffect, useState } from 'react';

function HospitalList() {
	const [centers, setCenters] = useState('')

	// useEffect(() => {
	// 	console.log('useEffect API Fetch with interval 5000')
	// 	setInterval(()=>{getVaccineDataFromApi()} , 5000);
	// 	return () => {
	// 	}
	// }, [])

	useEffect(() => {
		console.log('useEffect Dependency = Hosptals');
		console.log(centers);
		return () => {};
	}, [centers]);

	const getVaccineDataFromApi = async () => {
		console.log('Vaccine Api fetch ');
		try {
			const response = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=512&date=02-09-2021`, {
				mode: 'cors',
			});
			const data = await response.json();
			console.log('setHospital data');
			setCenters(data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<button onClick={getVaccineDataFromApi}>GetData</button>
		</div>
	);
}

export default HospitalList;
