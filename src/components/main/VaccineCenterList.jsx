import React, { useEffect, useState } from 'react';
import createVaccineCenterList from './Center';
import CenterDisplay from './CenterDisplay';
import { filterAge, filterPinCode, filterVaccine, filterName } from './Filter';
import { pushNotification } from './Notification';
import './VaccineCenterList.css';

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
				`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=307&date=07-09-2021`,
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
		console.log(filteredData[0]);
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
	const handleVaccineRadio = (e) => {
		setVaccineFilter(e.target.value);
	};
	const handleAgeRadio = (e) => {
		setAgeFilter(parseInt(e.target.value));
	};

	return (
		<div className='VaccineCenterList'>
			<button onClick={getDataFromApi}>GetData</button>
			<div className='filter-tab'>
				<div>
					<div className='switch-field'>
						<input
							type='radio'
							id='age-one'
							name='age-radio'
							value='0'
							onClick={handleAgeRadio}
							defaultChecked
						/>
						<label htmlFor='age-one'>All</label>
						<input type='radio' id='age-two' name='age-radio' value='18' onClick={handleAgeRadio} />
						<label htmlFor='age-two'>Age 18</label>
						<input
							type='radio'
							id='age-three'
							name='age-radio'
							value='40'
							onClick={handleAgeRadio}
						/>
						<label htmlFor='age-three'>Age 40</label>
						<input
							type='radio'
							id='age-four'
							name='age-radio'
							value='45'
							onClick={handleAgeRadio}
						/>
						<label htmlFor='age-four'>Age 45</label>
					</div>
					<div className='switch-field'>
						<input
							type='radio'
							id='vaccine-one'
							name='vaccine-radio'
							value='ALL'
							onClick={handleVaccineRadio}
							defaultChecked
						/>
						<label htmlFor='vaccine-one'>All</label>
						<input
							type='radio'
							id='vaccine-two'
							name='vaccine-radio'
							value='COVISHIELD'
							onClick={handleVaccineRadio}
						/>
						<label htmlFor='vaccine-two'>Covishield</label>
						<input
							type='radio'
							id='vaccine-three'
							name='vaccine-radio'
							value='COVAXIN'
							onClick={handleVaccineRadio}
						/>
						<label htmlFor='vaccine-three'>Covaxin</label>
						<input
							type='radio'
							id='vaccine-four'
							name='vaccine-radio'
							value='SPUTNIK V'
							onClick={handleVaccineRadio}
						/>
						<label htmlFor='vaccine-four'>Sputnik</label>
					</div>
				</div>
				<div>
					Name: <input type='text' onChange={handleNameFilter}></input>
					Pincode: <input type='number' onChange={handlePinCodeFilter}></input>
				</div>
			</div>
			{filteredVaccineCenters.length !== 0 ? (
				<CenterDisplay vaccineCenters={filteredVaccineCenters} />
			) : (
				<div>
					No vaccine centers available{' '}
					<button
						disabled={notificationStatus ? true : false}
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
