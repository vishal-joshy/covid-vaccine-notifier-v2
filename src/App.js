import React, { useState, useEffect } from 'react';
import './App.css';
import VaccineCenterList from './components/VaccineCenterList';
import createVaccineCenterList from './components/Center';

function App() {
	const [vaccineCenters, setVaccineCenters] = useState([]);

	const Header = () => {
		return (
			<header>
				<div>
					<h1>Covid Vaccine Notifier</h1>
					<h6>Ernakulam</h6>
				</div>
				<div className='cowin-link'>
					<button><a href="https://selfregistration.cowin.gov.in/">Co-WIN</a></button>
				</div>
			</header>
		);
	};
	const getPresentDate = function () {
		let today = new Date();
		const dd = String(today.getDate());
		const mm = String(today.getMonth() + 1);
		const yyyy = String(today.getFullYear());
		today = `${dd}-0${mm}-${yyyy}`;
		return today;
	};

	const getDataFromApi = async () => {
		try {
			const response = await fetch(
				`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=307&date=${getPresentDate()}`,
				{
					mode: 'cors',
				}
			);
			const apiData = await response.json();
			const centerList = createVaccineCenterList([...apiData.centers]);
			setVaccineCenters([...centerList]);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		//Call APi with Delay
		getDataFromApi();
		setInterval(() => {
			getDataFromApi();
		}, 10000);
		return () => {};
	}, []);

	return (
		<div className='App'>
			<Header />
			<VaccineCenterList vaccineCenters={vaccineCenters} />
		</div>
	);
}

export default App;
