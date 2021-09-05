import React, { useState } from 'react';
import './CenterDisplay.css';
import FullDetailsPopUp from './FullDetailsPopUp';

function CenterDisplay({ data, sortByName }) {
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [selectedCenter, setSelectedCenter] = useState('');

	console.log(data);

	return (
		<div>
			<table className='table'>
				<thead>
					<tr>
						<th scope='col'>Date</th>
						<th scope='col' onClick={sortByName}>
							Center
						</th>
						<th scope='col'>Dose 1</th>
						<th scope='col'>Dose 2</th>
					</tr>
				</thead>
				<tbody>
					{data.map((center, index) => {
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
										<h6 className='card-title'>{center.name}</h6>
										<h6 className='card-subtitle mb-2 text-muted'>{center.block_name}</h6>
										<p className='card-text'>{center.pincode}</p>
									</div>
								</td>
								<td>{center.sessions[0].available_capacity_dose1}</td>
								<td>{center.sessions[0].available_capacity_dose2}</td>
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

			{/* {data.map((center, index) => {
				return (
					<div
						key={index}
						className='card'
						onClick={() => {
							setIsPopupOpen(true);
							setSelectedCenter(center);
						}}>
						<div className='card-body'>
							<h5 className='card-title'>{center.name}</h5>
							<h6 className='card-subtitle mb-2 text-muted'>{center.block_name}</h6>
							<p className='card-text'>{center.pincode}</p>
						</div>
						<div>
							<div>
								<h4>Date</h4>
								<h5>{center.sessions[0].date}</h5>
							</div>
							<div>
								<h4>Dose1</h4>
								<h5>{center.sessions[0].available_capacity_dose1}</h5>
							</div>
							<div>
								<h4>Dose2</h4>
								<h5>{center.sessions[0].available_capacity_dose2}</h5>
							</div>
						</div>
					</div>
				);
			})}
			<FullDetailsPopUp
				isPopupOpen={isPopupOpen}
				selectedCenter={selectedCenter}
				closePopup={() => setIsPopupOpen(false)}
			/> */}
		</div>
	);
}

export default CenterDisplay;
