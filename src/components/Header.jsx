import React, { useState, useEffect } from 'react';

function Header({ getDistrict, selectedDistrict }) {
	const [districts, setDistricts] = useState([]);
	const [dropdownStatus, setDropdownStatus] = useState(false);

	const getStateData = async () => {
		const res = await fetch('https://cdn-api.co-vin.in/api/v2/admin/location/districts/17');
		const data = await res.json();
		setDistricts(data.districts);
	};

	useEffect(() => {
		getStateData();
	}, []);

	const handelDropdownButtonClick = () => {
		if (dropdownStatus) {
			setDropdownStatus(false);
		} else {
			setDropdownStatus(true);
		}
	};
	const handleDistrictSelection = (e, index) => {
		getDistrict(districts[index]);
		setDropdownStatus(false);
	};

	return (
		<header>
			<div>
				<h1>Covid Vaccine Notifier</h1>
				<div className='dropdown'>
					<button onClick={handelDropdownButtonClick} className='dropbtn'>
						{selectedDistrict.district_name}
					</button>
					<div
						id='myDropdown'
						className='dropdown-content'
						style={{ display: dropdownStatus ? 'block' : 'none' }}>
						{React.Children.toArray(
							districts.map((district, index) => {
								return (
									<div
										onClick={(e) => {
											handleDistrictSelection(e, index);
										}}>
										{district.district_name}
									</div>
								);
							})
						)}
					</div>
				</div>
			</div>
			<div className='cowin-link'>
				<button>
					<a href='https://selfregistration.cowin.gov.in/'>Co-WIN</a>
				</button>
			</div>
		</header>
	);
}

export default Header;
