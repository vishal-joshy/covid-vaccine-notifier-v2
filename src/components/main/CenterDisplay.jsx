import React, { useState, useEffect } from 'react';
import './CenterDisplay.css';
import FullDetailsPopUp from './FullDetailsPopUp';
import { sortCentersByDate, sortCentersByName } from './Sort';

function CenterDisplay({ vaccineCenters }) {
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [selectedCenter, setSelectedCenter] = useState('');
	const [userSortSelection, setUserSortSelection] = useState('');
	const [sortedData, setSortedData] = useState([]);

	useEffect(() => {
		if (userSortSelection === 'name') {
			setSortedData(sortCentersByName([...vaccineCenters]));
		} else {
			setSortedData(sortCentersByDate([...vaccineCenters]));
		}
	}, [userSortSelection, vaccineCenters]);

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th
							onClick={() => {
								setUserSortSelection('date');
							}}>
							Date
						</th>
						<th
							onClick={() => {
								setUserSortSelection('name');
							}}>
							Center
						</th>
						<th>Dose 1</th>
						<th>Dose 2</th>
						<th>Min.Age</th>
						<th>Vaccine</th>
						<th>Type</th>
					</tr>
				</thead>
				<tbody>
					{sortedData.map((center, index) => {
						return (
							<tr
								key={index}
								onClick={() => {
									setIsPopupOpen(true);
									setSelectedCenter(center);
								}}>
								<td>{center.sessions[0].date}</td>
								<td>
									<div>
										<h6>{center.name}</h6>
										<h6>{center.block_name}</h6>
										<p>{center.pincode}</p>
									</div>
								</td>
								<td>{center.sessions[0].available_capacity_dose1}</td>
								<td>{center.sessions[0].available_capacity_dose2}</td>
								<td>{center.sessions[0].min_age_limit}</td>
								<td>{center.sessions[0].vaccine}</td>
								<td>{center.fee_type}</td>
							</tr>
						);
					})}

					<FullDetailsPopUp
						isPopupOpen={isPopupOpen}
						selectedCenter={selectedCenter}
						closePopup={() => setIsPopupOpen(false)}
					/>
				</tbody>
			</table>
		</div>
	);
}

export default CenterDisplay;
