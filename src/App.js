import React from 'react';
import './App.css';
import VaccineCenterList from './components/main/VaccineCenterList';

function App() {
	const Header = () => {
		return (
			<div className="Header">
				<h1>Covid Vaccine Notifier</h1>
			</div>
		);
	};
	return (
		<div className="App">
			<Header />
			
			<VaccineCenterList />
		</div>
	);
}

export default App;
