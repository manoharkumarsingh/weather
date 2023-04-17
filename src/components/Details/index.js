import React from "react";

import Wind from "../Graph";

const Details = (props) => {
  if (props.weather_data && Object.keys(props.weather_data).length > 0) {
    return <Wind weather_data={props.weather_data} />;
  } else {
    return <></>;
  }
};
export default Details;
