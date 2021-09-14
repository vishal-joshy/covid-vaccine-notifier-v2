import React, { useState, useEffect } from 'react';
import './App.css';
import VaccineCenterList from './components/VaccineCenterList';
import createVaccineCenterList from './components/Center';
import Header from './components/Header';

function App() {
	const [vaccineCenters, setVaccineCenters] = useState([]);
	const [selectedDistrict, setSelectedDistrict] = useState({
		district_id: 307,
		district_name: 'Ernakulam',
	});

	const getPresentDate = function () {
		let today = new Date();
		const dd = String(today.getDate());
		const mm = String(today.getMonth() + 1);
		const yyyy = String(today.getFullYear());
		today = `${dd}-0${mm}-${yyyy}`;
		return today;
	};

	const getDataFromApi = async (url) => {
		console.log(url);
		try {
			const response = await fetch(url, {
				mode: 'cors',
			});
			const apiData = await response.json();
			console.log(apiData);
			const centerList = createVaccineCenterList([...apiData.centers]);
			setVaccineCenters([...centerList]);
		} catch (err) {
			console.log(err);
		}
	};

	const getDistrict = (district) => {
		console.log(district);
		setSelectedDistrict(district);
	};

	const getUrl = () => {
		const district = selectedDistrict.district_id;
		const date = getPresentDate();
		const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district}&date=${date}`;
		return url;
	};

	useEffect(() => {
		//Call APi with Delay

		getDataFromApi(getUrl());

		const inter = setInterval(() => {
			getDataFromApi(getUrl());
		}, 10000);

		return () => {
			clearInterval(inter);
		};
	}, [selectedDistrict]);

	return (
		<div className='App'>
			<Header getDistrict={getDistrict} selectedDistrict={selectedDistrict} />
			<VaccineCenterList vaccineCenters={vaccineCenters} />
		</div>
	);
}

export default App;
