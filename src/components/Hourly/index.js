import React, { useEffect, useState } from "react";
import PaginatedItems from "../Pagination";

const Hourly = (props) => {
  const [addHours, setAddHours] = useState([]);

  const hoursInterval = () => {
    let result = [];
    let currentTime = new Date().getHours();
    for (var hours = currentTime; hours < currentTime + 48; hours++) {
      var h = "";
      let tempHour = hours > 48 ? hours - 48 : hours > 24 ? hours - 24 : hours;

      if (tempHour < 10) {
        h = "0" + tempHour;
      } else {
        h = tempHour;
      }
      result.push(h + ":00");
    }
    return result;
  };

  useEffect(() => {
    if (props.weather_data && Object.keys(props.weather_data).length > 0) {
      /**Adding current time */
      const today = new Date();
      const cuttentTime = today.getHours() + ":" + today.getMinutes();
      let hoursData = props.weather_data.hourly;
      hoursData[0]["hours"] = cuttentTime;
      hoursData[0]["weather"][0]["main"] =
        props.weather_data["current"]["weather"][0]["main"];
      // hoursData[0]["hours"]["weather"][0]["main"] =
      //   props.weather_data["current"]["weather"][0]["main"];
      let res = hoursInterval();
      hoursData.forEach((obj, index) => {
        if (index > 0) {
          obj["hours"] = res[index];
        }
      });
      setAddHours(hoursData);
    }
  }, [props.weather_data]);

  return (
    <>
      <div className="deatilsContainer">
        {props.weather_data && Object.keys(props.weather_data).length > 0 && (
          <PaginatedItems itemsPerPage={6} weather_data={addHours} />
        )}
      </div>
    </>
  );
};

export default Hourly;
