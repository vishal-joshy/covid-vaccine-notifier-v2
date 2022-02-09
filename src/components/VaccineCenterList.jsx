import React, { useEffect, useState } from 'react';
import CenterDisplay from './Centers/CenterDisplay';
import { getTime } from './HelperModules/DateTime';
import {
	filterAge,
	filterPinCode,
	filterVaccine,
	filterName,
	filterFee,
	filterDose,
	pipe
} from './HelperModules/Filter';
import { pushNotification } from './HelperModules/Notification';
import './VaccineCenterList.css';

function VaccineCenterList({ vaccineCenters }) {
	const [filteredVaccineCenters, setFilteredVaccineCenters] = useState([]);

	const [ageFilter, setAgeFilter] = useState(0);
	const [vaccineFilter, setVaccineFilter] = useState('ALL');
	const [nameFilter, setNameFilter] = useState('');
	const [pinCodeFilter, setPinCodeFilter] = useState(0);
	const [feeFilter, setFeeFilter] = useState('ALL');
	const [doseFilter, setDoseFilter] = useState('ALL');

	const [notificationStatus, setNotificationStatus] = useState(false);

	

	useEffect(() => {
			// const filterData = (data) =>
		// 	filterPinCode(
		// 		pinCodeFilter,
		// 		filterName(
		// 			nameFilter,
		// 			filterVaccine(
		// 				vaccineFilter,
		// 				filterAge(ageFilter, filterFee(feeFilter, filterDose(doseFilter, data)))
		// 			)
		// 		)
		// 	);
		const filterData = pipe(
			filterPinCode(pinCodeFilter),
			filterName(nameFilter),
			filterVaccine(vaccineFilter),
			filterAge(ageFilter),
			filterFee(feeFilter),
			filterDose(doseFilter)
		);

		const filteredData = filterData([...vaccineCenters]);

		if (notificationStatus) {
			Notification.requestPermission();
			if (filteredData.length > 0) {
				pushNotification();
				setNotificationStatus(false);
			}
		}
		setFilteredVaccineCenters(filteredData);
	}, [
		ageFilter,
		vaccineFilter,
		nameFilter,
		pinCodeFilter,
		vaccineCenters,
		notificationStatus,
		feeFilter,
		doseFilter,
	]);

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
	const handleFeeRadio = (e) => {
		setFeeFilter(e.target.value);
	};
	const handleDoseRadio = (e) => {
		setDoseFilter(e.target.value);
	};

	return (
		<div className='VaccineCenterList'>
			<div className='filter-container'>
				<div className='radio-container'>
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
						<label htmlFor='age-two'>Age 18+</label>
						<input
							type='radio'
							id='age-three'
							name='age-radio'
							value='40'
							onClick={handleAgeRadio}
						/>
						<label htmlFor='age-three'>Age 40+</label>
						<input
							type='radio'
							id='age-four'
							name='age-radio'
							value='45'
							onClick={handleAgeRadio}
						/>
						<label htmlFor='age-four'>Age 45+</label>
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

					<div className='switch-field'>
						<input
							type='radio'
							id='fee-one'
							name='fee-radio'
							value='ALL'
							onClick={handleFeeRadio}
							defaultChecked
						/>
						<label htmlFor='fee-one'>All</label>
						<input
							type='radio'
							id='fee-two'
							name='fee-radio'
							value='Free'
							onClick={handleFeeRadio}
						/>
						<label htmlFor='fee-two'>Free</label>
						<input
							type='radio'
							id='fee-three'
							name='fee-radio'
							value='Paid'
							onClick={handleFeeRadio}
						/>
						<label htmlFor='fee-three'>Paid</label>
					</div>

					<div className='switch-field'>
						<input
							type='radio'
							id='dose-one'
							name='dose-radio'
							value='ALL'
							onClick={handleDoseRadio}
							defaultChecked
						/>
						<label htmlFor='dose-one'>All</label>
						<input
							type='radio'
							id='dose-two'
							name='dose-radio'
							value='dose1'
							onClick={handleDoseRadio}
						/>
						<label htmlFor='dose-two'>Dose1</label>
						<input
							type='radio'
							id='dose-three'
							name='dose-radio'
							value='dose2'
							onClick={handleDoseRadio}
						/>
						<label htmlFor='dose-three'>Dose2</label>
					</div>
				</div>

				<div className='secondary-filter-container'>
					<div className='input-filter-container'>
						<div>
							<label htmlFor='name-filter'>Name</label>
							<input type='text' id='name-filter' onChange={handleNameFilter}></input>
						</div>
						<div>
							<label htmlFor='pin-filter'>Pincode</label>
							<input type='number' id='pin-filter' onChange={handlePinCodeFilter}></input>
						</div>
					</div>
					<div>Last refresh : {getTime()}</div>
				</div>
			</div>
			<div className='vaccine-list-table'>
				{filteredVaccineCenters.length !== 0 ? (
					<CenterDisplay vaccineCenters={filteredVaccineCenters} />
				) : (
					<div className='notification-prompt'>
						<h4>No vaccine centers available!</h4>
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
		</div>
	);
}

export default VaccineCenterList;