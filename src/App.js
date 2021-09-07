import React from 'react';
import './App.css';
import VaccineCenterList from './components/main/VaccineCenterList';

function App() {
	const Header = () => {
		return (
			<header>
				<div>
					<h1>Covid Vaccine Notifier</h1>
					<h6>Ernakulam</h6>
				</div>
				<div>
					<button>Co-win </button>
				</div>
			</header>
		);
	};
	return (
		<div className='App'>
			<Header />
			<VaccineCenterList />
		</div>
	);
}

export default App;
