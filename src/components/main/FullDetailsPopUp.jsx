import React from 'react';
import ReactDom from 'react-dom';

function FullDetailsPopUp({ isPopupOpen, selectedCenter, closePopup }) {
	let sessionsArray = selectedCenter.sessions;
	if (!isPopupOpen) return null;
	console.log(selectedCenter);
	selectedCenter.sessions.forEach((element) => {
		console.log(element);
	});
	return ReactDom.createPortal(
		<>
			<div className='overlay'></div>
			<div className='pop-up'>
				<button onClick={closePopup}>x</button>
				<div>
					<h5>{selectedCenter.name}</h5>
					<h6>{selectedCenter.block_name}</h6>
					<h6>{selectedCenter.address}</h6>
					<p>{selectedCenter.pincode}</p>
				</div>
				<div>
					<table>
						<thead>
							<tr>
								<th>Date</th>
								<th>Dose 1</th>
								<th>Dose 2</th>
							</tr>
						</thead>
						<tbody>
							{sessionsArray.map((session, index) => {
								return (
									<tr key={index}>
										<td>{session.date}</td>
										<td>{session.available_capacity_dose1}</td>
										<td>{session.available_capacity_dose2}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</>,
		document.getElementById('modal-root')
	);
}

export default FullDetailsPopUp;
