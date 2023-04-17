import React from "react";
import Location from "../Location";
import Hourly from "../Hourly";
import Details from "../Details";
import SearchLocation from "../Find_location";
import { connect } from "react-redux";
import backgroundImage from "../../resources/image1.png";
const Weather = (props) => {
  if (props.loader) {
    return (
      <div
        className="weatherSection weather-loader"
        style={{ backgroundImage: "url(" + backgroundImage + ")" }}
      >
        <div class="loader"></div>
      </div>
    );
  } else if (!props.locationMatch) {
    return (
      <div
        className="weatherSection"
        style={{
          backgroundImage: "url(" + backgroundImage + ")",
        }}
      >
        <div className="weather-deatils">
          <SearchLocation></SearchLocation>
          <div className="location-notavailable">
            Location is not available.
          </div>
        </div>
      </div>
    );
  } else if (props.weather_data && Object.keys(props.weather_data).length > 0) {
    return (
      <div
        className="weatherSection"
        style={{ backgroundImage: "url(" + backgroundImage + ")" }}
      >
        <Location weather_data={props.weather_data} />
        <div className="weather-deatils">
          <SearchLocation></SearchLocation>
          <Hourly weather_data={props.weather_data} />
          <Details weather_data={props.weather_data} />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  loader: state.weather.loader,
  locationMatch: state.weather.locationMatch,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
