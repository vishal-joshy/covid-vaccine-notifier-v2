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
		<>
			<table className='vaccine-list-table'>
				<thead>
					<tr>
						<th
							className='col col-1'
							onClick={() => {
								setUserSortSelection('date');
							}}>
							Date
						</th>
						<th
							className='col col-2'
							onClick={() => {
								setUserSortSelection('name');
							}}>
							Center
						</th>
						<th className='col col-3'>Dose 1</th>
						<th className='col col-4'>Dose 2</th>
						<th className='col col-5'>Min.Age</th>
						<th className='col col-6'>Vaccine</th>
						<th className='col col-7'>Type</th>
					</tr>
				</thead>
				<tbody className='vaccine-table-body'>
					{React.Children.toArray(
						sortedData.map((center) => {
							return (
								<tr
									onClick={() => {
										setIsPopupOpen(true);
										setSelectedCenter(center);
									}}>
									<td className='col col-1'>{center.sessions[0].date}</td>
									<td className='col col-2'>
										<div>
											{center.name},{center.block_name},{center.pincode}
										</div>
									</td>
									<td className='col col-3'>{center.sessions[0].available_capacity_dose1}</td>
									<td className='col col-4'>{center.sessions[0].available_capacity_dose2}</td>
									<td className='col col-5'>{center.sessions[0].min_age_limit}</td>
									<td className='col col-6'>{center.sessions[0].vaccine}</td>
									<td className='col col-7'>{center.fee_type}</td>
								</tr>
							);
						})
					)}

					<FullDetailsPopUp
						isPopupOpen={isPopupOpen}
						selectedCenter={selectedCenter}
						closePopup={() => setIsPopupOpen(false)}
					/>
				</tbody>
			</table>
		</>
	);
}

export default CenterDisplay;
