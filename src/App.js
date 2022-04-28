import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import VaccineCenterList from './components/VaccineCenterList';
import { createVaccineCenterList } from './components/HelperModules/Center';
import Header from './components/Header';
import { getCurrentDate } from './components/HelperModules/DateTime';

const initialDistrict = {
  district_id: 307,
  district_name: 'Ernakulam',
};

function App() {
  const [vaccineCenters, setVaccineCenters] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);

  const getVaccineCenters = useCallback(async () => {
    const url = new URL(
      'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict',
    );
    url.searchParams.append('district_id', selectedDistrict.district_id);
    url.searchParams.append('date', getCurrentDate());
    try {
      const response = await fetch(url, {
        mode: 'cors',
      });
      const data = await response.json();
      const centerList = createVaccineCenterList(data.centers);
      setVaccineCenters(centerList);
    } catch (err) {
      console.log(err);
    }
  }, [selectedDistrict]);

  const getDistrict = district => setSelectedDistrict(district);

  useEffect(() => {
    getVaccineCenters();
    const inter = setInterval(() => {
      getVaccineCenters();
    }, 10000);

    return () => {
      clearInterval(inter);
    };
  }, [selectedDistrict, getVaccineCenters]);

  return (
    <div className="App">
      <Header getDistrict={getDistrict} selectedDistrict={selectedDistrict} />
      {vaccineCenters && <VaccineCenterList vaccineCenters={vaccineCenters} />}
    </div>
  );
}

export default App;
