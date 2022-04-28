import React, { useEffect, useState, memo } from 'react';
import CenterDisplay from './Centers/CenterDisplay';
import { getTime } from './HelperModules/DateTime';
import { applyFilters } from './HelperModules/Filter';
import { pushNotification } from './HelperModules/Notification';
import './VaccineCenterList.css';

const initialFilters = {
  age: 0,
  vaccine: 'ALL',
  name: '',
  pinCode: 0,
  fee: 'ALL',
  dose: 'ALL',
};

function VaccineCenterList({ vaccineCenters }) {
  const [filteredVaccineCenters, setFilteredVaccineCenters] = useState([]);
  const [filter, setFilter] = useState(initialFilters);

  const [notificationStatus, setNotificationStatus] = useState(false);

  useEffect(() => {
    const filteredData = applyFilters(filter, vaccineCenters);

    if (notificationStatus) {
      Notification.requestPermission();
      if (filteredData.length > 0) {
        pushNotification();
        setNotificationStatus(false);
      }
    }
    setFilteredVaccineCenters(filteredData);
  }, [filter, vaccineCenters]);

  const handleChange = e => {
    if (e.target.name === 'age') {
      setFilter({ ...filter, age: parseInt(e.target.value) });
      return;
    }
    setFilter({ ...filter, ...{ [e.target.name]: e.target.value } });
  };

  return (
    <div className="VaccineCenterList">
      <div className="filter-container">
        <div className="radio-container">
          <div className="switch-field">
            {['0', '18', '40', '45'].map(el => (
              <React.Fragment key={el}>
                <input
                  type="radio"
                  id={`age${el}`}
                  name="age"
                  value={el}
                  onClick={handleChange}
                  defaultChecked={el === '0'}
                />
                <label htmlFor={`age${el}`}>
                  {el === '0' ? 'ALL' : el + '+'}
                </label>
              </React.Fragment>
            ))}
          </div>

          <div className="switch-field">
            {['All', 'Covishield', 'Covaxin', 'Sputnik V'].map(el => (
              <React.Fragment key={el}>
                <input
                  type="radio"
                  id={`vaccine${el}`}
                  name="vaccine"
                  value={el.toUpperCase()}
                  onClick={handleChange}
                  defaultChecked={el === 'All'}
                />
                <label htmlFor={`vaccine${el}`}>{el}</label>
              </React.Fragment>
            ))}
          </div>

          <div className="switch-field">
            {['All', 'Free', 'Paid'].map(el => (
              <React.Fragment key={el}>
                <input
                  type="radio"
                  id={`fee${el}`}
                  name="fee"
                  value={el === 'All' ? 'ALL' : el}
                  onClick={handleChange}
                  defaultChecked={el === 'All'}
                />
                <label htmlFor={`fee${el}`}>{el}</label>
              </React.Fragment>
            ))}
          </div>

          <div className="switch-field">
            {['All', 'Dose1', 'Dose2'].map(el => (
              <React.Fragment key={el}>
                <input
                  type="radio"
                  id={`dose${el}`}
                  name="dose"
                  value={el === 'All' ? 'ALL' : el.toLowerCase()}
                  onClick={handleChange}
                  defaultChecked={el === 'All'}
                />
                <label htmlFor={`dose${el}`}>{el}</label>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="secondary-filter-container">
          <div className="input-filter-container">
            <div>
              <label htmlFor="name-filter">Name</label>
              <input
                type="text"
                id="name-filter"
                name={'name'}
                onChange={handleChange}
              ></input>
            </div>

            <div>
              <label htmlFor="pin-filter">Pincode</label>
              <input
                type="number"
                id="pin-filter"
                name={'pinCode'}
                onChange={handleChange}
              ></input>
            </div>
          </div>

          <div>Last refresh : {getTime()}</div>
        </div>
      </div>

      <div className="vaccine-list-table">
        {filteredVaccineCenters.length !== 0 ? (
          <CenterDisplay vaccineCenters={filteredVaccineCenters} />
        ) : (
          <div className="notification-prompt">
            <h4>No vaccine centers available!</h4>
            <button
              disabled={notificationStatus ? true : false}
              onClick={() => {
                setNotificationStatus(true);
              }}
            >
              Notify Me !
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(VaccineCenterList);
