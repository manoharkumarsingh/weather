import React, { useEffect } from "react";
import { connect } from "react-redux";
import { get_weather, current_location } from "./Redux/action/weather";
import Weather from "./components/Weather";

const App = (props) => {
  useEffect(() => {
    // props.get_weather();
    props.current_location();
  }, []);
  return (
    <div className="appContainer">
      <Weather weather_data={props.weather_data} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  weather_data: state.weather.weather_data,
});

const mapDispatchToProps = {
  get_weather,
  current_location,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
