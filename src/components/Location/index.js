import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Snow from "../../resources/snow.png";
import Clouds from "../../resources/cloudy.png";
import Fog from "../../resources/foggy.png";
import Rain from "../../resources/rain.png";
import Thunderstorm from "../../resources/thunderstorm.png";
import Haze from "../../resources/haze.png";
import Clear from "../../resources/clear-sky.png";
import Placeholder from "../../resources/placeholder.png";
import Calendar from "../../resources/calendar.png";

const Location = (props) => {
  const [tempInfo, setTempInfo] = useState({
    description: "",
    temp: "",
    pressure: "",
    humidity: "",
    name: "",
    today: "",
    status: "",
    statusImg: "",
  });

  const getWeatherImgUrl = (main) => {
    switch (main) {
      case "Snow": {
        return Snow;
      }
      case "Clouds": {
        return Clouds;
      }
      case "Fog": {
        return Fog;
      }
      case "Rain": {
        return Rain;
      }
      case "Thunderstorm": {
        return Thunderstorm;
      }
      case "Haze": {
        return Haze;
      }
      default:
        return Clear;
    }
  };

  useEffect(() => {
    const data = props.weather_data;
    if (data && Object.keys(data).length > 0) {
      let description = data.current.weather[0].description;
      let temp = Math.round(data.current.temp);
      let pressure = data.current.pressure;
      let humidity = data.current.humidity;
      let locationName = "Hajipur";
      let status = data.current["weather"][0]["main"];
      setTempInfo({
        description: description,
        temp: temp + "°C",
        pressure: pressure,
        humidity: humidity + "°C",
        name: locationName,
        today: new Date().toDateString(),
        status: status,
        statusImg: getWeatherImgUrl(status),
      });
    }
  }, [props.weather_data]);

  const locationInfo = props.loaction_data ? props.loaction_data.location : "";

  return (
    <div class="location-card">
      <div className="currentWeatherIcn">
        <img className="weatherIcn" src={tempInfo.statusImg} alt={""}></img>
      </div>
      <div className="locationTempLablel">{tempInfo.temp}</div>
      <div className="weather-description">
        <div className="weather-description-icn">
          <img src={tempInfo.statusImg} alt={""}></img>
        </div>
        <div className="weather-type-name">{tempInfo.status}</div>
      </div>

      {locationInfo ? (
        <>
          <div className="weather-description">
            <div className="weather-description-icn">
              <img src={Placeholder} alt={""}></img>
            </div>
            <div className="weather-type-name">{locationInfo.name}</div>
          </div>

          <div className="weather-description">
            <div className="weather-description-icn">
              <img src={Calendar} alt={""}></img>
            </div>
            <div className="weather-type-name"> {locationInfo.localtime}</div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  weather_data: state.weather.weather_data,
  loaction_data: state.weather.location,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Location);
