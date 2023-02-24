import './App.css';
import React, { useState } from 'react';



export default function App() {

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [name, setName] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);

  const [errorMessage, setErrorMessage] = useState('');


  const [buttonNames, setButtonNames] = useState([(
    <button key={0} onClick={() => handleDislay(10, 10)}>
      Longitude: {10}
      Latitude: {10}
    </button>
  ), (
    <button key={1} onClick={() => handleDislay(20, 20)}>
      Longitude: {20}
      Latitude: {20}
    </button>

  ),
  (

    <button key={2} onClick={() => handleDislay(30, 30)}>
      Longitude: {30}
      Latitude: {30}
    </button>
  )
  ]);

  const handleButtonClick = (longitude, latitude, name) => {
    if(isNaN(+longitude) || isNaN(+latitude)) {
      setErrorMessage("Invalid Input. Only Enter Numbers for Longitude and Latitude.");
      return;
    } else if (longitude === "" || latitude === "" || name === "") {
      setErrorMessage("No Input.");
      return;
    }
    else {
      setErrorMessage("");
    }
    const newButton = (
      <button key={buttonNames.length} onClick={() => handleDislay(latitude, longitude)}>
        {name}
      </button>
    );
    setButtonNames([...buttonNames, newButton]);
  }

  function handleDislay(latitude, longitude) {
    const json_info = fetchAPIData('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&hourly=temperature_2m');
    json_info.then(function (json) {
      console.log(json)
      setWeatherInfo(json.hourly.time);
    });
  }


  return (
    <div>
      <h1>
        Weather Infomation
      </h1>
      <div>
        <label>Name of Location</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
      </div>
      <div>
        <label>Longitude</label>
        <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} ></input>
      </div>
      <div>
        <label>Latitude</label>
        <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} ></input>
      </div>
      <div>
        <button onClick={() => handleButtonClick(longitude, latitude, name)}>Add New Location</button>
      </div>

      {errorMessage && (
        <p className="error"> {errorMessage} </p>
      )}

      <div>
        {buttonNames}
      </div>
      <div>
        {weatherInfo}
      </div>
    </div>
  );
}

async function fetchAPIData(url) {
  try {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json.hourly);
    return json;
  } catch (err) {
    console.log('Error trying to fetch data');
    return -1;
  }
}