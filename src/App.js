import React, { useState, useEffect } from 'react';
import './App.css';
import VaccineCenterList from './components/VaccineCenterList';
import { createVaccineCenterList } from './components/HelperModules/Center';
import Header from './components/Header';
import { getPresentDate } from './components/HelperModules/DateTime';

function App() {
	const [vaccineCenters, setVaccineCenters] = useState([]);
	const [selectedDistrict, setSelectedDistrict] = useState({
		district_id: 307,
		district_name: 'Ernakulam',
	});

	const getDataFromApi = async (url) => {
		try {
			const response = await fetch(url, {
				mode: 'cors',
			});
			const apiData = await response.json();
			const centerList = createVaccineCenterList([...apiData.centers]);
			setVaccineCenters([...centerList]);
		} catch (err) {
			console.log(err);
		}
	};

	const getDistrict = (district) => {
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
