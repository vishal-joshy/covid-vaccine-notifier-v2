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
					<h5 className='card-title'>{selectedCenter.name}</h5>
					<h6 className='card-subtitle mb-2 text-muted'>{selectedCenter.block_name}</h6>
					<h6 className='card-subtitle mb-2 text-muted'>{selectedCenter.address}</h6>
					<p className='card-text'>{selectedCenter.pincode}</p>
				</div>
				<div>
					<table className='table'>
						<thead>
							<tr>
								<th scope='col'>Date</th>
								<th scope='col'>Dose 1</th>
								<th scope='col'>Dose 2</th>
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
