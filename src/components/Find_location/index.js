import React, { useState } from "react";
import { get_weather } from "../../Redux/action/weather";
import { connect } from "react-redux";

const SearchLocation = (props) => {
  const [location, setLocation] = useState("");

  const findLocation = () => {
    props.get_weather(location);
    setLocation("");
  };
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search location.."
        name="search"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="submit" onClick={() => findLocation()}>
        Submit
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  weather_data: state.weather.weather_data,
});

const mapDispatchToProps = {
  get_weather,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchLocation);
