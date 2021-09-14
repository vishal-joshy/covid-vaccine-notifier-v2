import React from 'react';
import ReactDom from 'react-dom';
import './FullDetailsPopUp.css';

function FullDetailsPopUp({ isPopupOpen, selectedCenter, closePopup }) {
	let sessionsArray = selectedCenter.sessions;
	if (!isPopupOpen) return null;
	
	return ReactDom.createPortal(
		<>
			<div className='overlay'></div>
			<div className='pop-up'>
				<button onClick={closePopup}>X</button>
				<table className='details-table'>
					<tbody>
						<tr>
							<td className='details-head'>Center:</td>
							<td>{selectedCenter.name}</td>
						</tr>
						<tr>
							<td className='details-head'>Address:</td>
							<td>{selectedCenter.address}</td>
						</tr>
						<tr>
							<td className='details-head'>Pincode:</td>
							<td>{selectedCenter.pincode}</td>
						</tr>
						<tr>
							<td className='details-head'>Vaccine:</td>
							<td>{selectedCenter.sessions[0].vaccine}</td>
						</tr>
						<tr>
							<td className='details-head'>Fee:</td>
							{(selectedCenter.fee_type==='Free')?(<td>Free</td>):(<td>₹{selectedCenter.vaccine_fees[0].fee}</td>)}
						</tr>
					</tbody>
				</table>

				<div>
					<h4>All Sessions</h4>
					<table className='all-sessions-table'>
						<thead>
							<tr>
								<th>Date</th>
								<th>Min.Age</th>
								<th>Dose 1</th>
								<th>Dose 2</th>
							</tr>
						</thead>
						<tbody>
							{React.Children.toArray(sessionsArray.map((session) => {
								return (
									<tr>
										<td>{session.date}</td>
										<td>{session.min_age_limit}</td>
										<td>{session.available_capacity_dose1}</td>
										<td>{session.available_capacity_dose2}</td>
									</tr>
								);
							}))}
						</tbody>
					</table>
				</div>
			</div>
		</>,
		document.getElementById('modal-root')
	);
}

export default FullDetailsPopUp;
