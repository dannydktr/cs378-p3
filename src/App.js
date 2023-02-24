import './App.css';
import React, { useState } from 'react';
import { useEffect } from 'react';



export default function App() {

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [name, setName] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);

  const [errorMessage, setErrorMessage] = useState('');


  const [buttonNames, setButtonNames] = useState([(
    <button key={0} onClick={() => handleDisplay(30.27, -97.74)}>
      Austin, TX
    </button>
  ), (
    <button key={1} onClick={() => handleDisplay(29.76, -95.36)}>
      Houston, TX
    </button>

  ),
  (
    <button key={2} onClick={() => handleDisplay(40.71, -74.01)}>
      New York, NY
    </button>
  )
  ]);

  const handleButtonClick = (longitude, latitude, name) => {
    if (isNaN(+longitude) || isNaN(+latitude)) {
      setErrorMessage("Invalid Input. Only Enter Numbers for Longitude and Latitude.");
      return;
    } else if (longitude === "" || latitude === "" || name === "") {
      setErrorMessage("No Input.");
      return;
    }
    else {
      setErrorMessage("");
    }
    handleDisplay(latitude, longitude);
    const newButton = (
      <button key={buttonNames.length} onClick={() => handleDisplay(latitude, longitude)}>
        {name}
      </button>
    );
    setButtonNames([...buttonNames, newButton]);
  }

  function handleDisplay(latitude, longitude) {
    const json_info = fetchAPIData('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&hourly=temperature_2m');


    json_info.then(function (json) {
      console.log(json);
      json.hourly.time.slice(0, 12);
      json.hourly.temperature_2m.slice(0, 12);
      setWeatherInfo(
        <div>
          <h2>Hourly Weather Data</h2>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Temperature (°C)</th>
              </tr>
            </thead>
            <tbody>
              {json.hourly.time.map((time, index) => (
                <tr key={time}>
                  <td>{new Date(time).toLocaleTimeString()}</td>
                  <td>{json.hourly.temperature_2m[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    });
  }

  useEffect(() => {
    handleDisplay(30.27, -97.74);
  }
    , []);


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
        {errorMessage && (
          <p className="error"> {errorMessage} </p>
        )}
      </div>
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