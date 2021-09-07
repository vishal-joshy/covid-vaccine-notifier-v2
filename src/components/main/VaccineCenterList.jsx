import React, { useEffect, useState } from 'react';
import createVaccineCenterList from './Center';
import CenterDisplay from './CenterDisplay';
import { filterAge, filterPinCode, filterVaccine, filterName } from './Filter';
import { pushNotification } from './Notification';

function VaccineCenterList() {
	const [vaccineCenters, setVaccineCenters] = useState([]);
	const [ageFilter, setAgeFilter] = useState(0);
	const [vaccineFilter, setVaccineFilter] = useState('ALL');
	const [filteredVaccineCenters, setFilteredVaccineCenters] = useState([]);
	const [nameFilter, setNameFilter] = useState('');
	const [pinCodeFilter, setPinCodeFilter] = useState(0);
	const [notificationStatus, setNotificationStatus] = useState(false);

	// useEffect(() => {					//Call APi with Delay
	// 	console.log('useEffect API Fetch with interval 5000')
	// 	setInterval(()=>{getDataFromApi()} , 5000);
	// 	return () => {
	// 	}
	// }, [])

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
			const centerList = createVaccineCenterList(apiData.centers);
			setVaccineCenters(centerList);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		const filteredData = filterPinCode(
			pinCodeFilter,
			filterName(
				nameFilter,
				filterVaccine(vaccineFilter, filterAge(ageFilter, [...vaccineCenters]))
			)
		);
		if (notificationStatus) {
			if (filteredData.length > 0) {
				console.log('push notification');
				pushNotification();
				setNotificationStatus(false);
			}
		}
		setFilteredVaccineCenters(filteredData);
	}, [ageFilter, vaccineFilter, nameFilter, pinCodeFilter, vaccineCenters, notificationStatus]);

	const handleNameFilter = (e) => {
		setNameFilter(e.target.value);
	};
	const handlePinCodeFilter = (e) => {
		setPinCodeFilter(e.target.value);
	};

	return (
		<div className='VaccineCenterList'>
			<button onClick={getDataFromApi}>GetData</button>
			<div>
				Filters : Name: <input type='text' onChange={handleNameFilter}></input>
				Pincode: <input type='number' onChange={handlePinCodeFilter}></input>
				Age:
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
			{filteredVaccineCenters.length !== 0 ? (
				<CenterDisplay vaccineCenters={filteredVaccineCenters} />
			) : (
				<div>
					No vaccine centers available{' '}
					<button
						onClick={() => {
							setNotificationStatus(true);
						}}>
						Notify Me !
					</button>
				</div>
			)}
		</div>
	);
}

export default VaccineCenterList;
