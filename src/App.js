import './App.css';
import React, { useState } from 'react';

export default function App() {

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [buttonNames, setButtonNames] = useState([(
    <button onClick={() => fetchAPIData('https://api.open-meteo.com/v1/forecast?latitude=' + 10 + '&longitude=' + 10 + '&hourly=temperature_2m')}>
      Longitude: {10}
      Latitude: {10}
    </button>
  ), (
    <button onClick={() => fetchAPIData('https://api.open-meteo.com/v1/forecast?latitude=' + 20 + '&longitude=' + 20 + '&hourly=temperature_2m')}>
      Longitude: {20}
      Latitude: {20}
    </button>
  ),
  (
    <button onClick={() => fetchAPIData('https://api.open-meteo.com/v1/forecast?latitude=' + 30 + '&longitude=' + 30 + '&hourly=temperature_2m')}>
      Longitude: {30}
      Latitude: {30}
    </button>
  )
  ]);

  const handleButtonClick = (longitude, latitude) => {
    const newButton = (
      <button onClick={() => fetchAPIData('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&hourly=temperature_2m')}>
        Longitude: {longitude}
        Latitude: {latitude}
      </button>
    );
    setButtonNames([...buttonNames, newButton]);
  }

  function handleDislay() {

  }


  return (
    <div>
      <div>
        <label>Longitude</label>
        <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} ></input>
      </div>
      <div>
        <label>Latitude</label>
        <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} ></input>
      </div>
      <div>
        <button onClick={() => handleButtonClick(longitude, latitude)}>Add New Location</button>
      </div>
      <div>
        {buttonNames}
      </div>
    </div>
  );
}

async function fetchAPIData(url) {
  try {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json.hourly);
  } catch (err) {
    console.log('Error trying to fetch data');
  }
}