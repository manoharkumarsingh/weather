import { GET_WEATHER, LOADER } from "../constant";
import axios from "axios";

let current_lat = "",
  current_lon = "";

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  current_lat = position["coords"]["latitude"];
  current_lon = position["coords"]["longitude"];
}

export const current_location = () => async (dispatch) => {
  const weather_data = axios.get(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      current_lat +
      "&lon=" +
      current_lon +
      "&units=metric&exclude=minutely,alerts&appid=dbb76c5d98d5dbafcb94441c6a10236e"
  );
  Promise.all([weather_data])
    .then((res1) => {
      console.log(res1[0].data);
      dispatch({
        type: GET_WEATHER,
        payload: {
          weather: res1[0].data,
          // location: ,
        },
      });
      dispatch({
        type: LOADER,
        payload: {
          data: false,
          locationMatch: true,
        },
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const get_weather =
  (location = "Hajipur") =>
  async (dispatch) => {
    dispatch({
      type: LOADER,
      payload: {
        data: true,
        locationMatch: true,
      },
    });

    // console.log(loaction);
    const weather_location_info = axios.get(
      "http://api.weatherstack.com/current?access_key=88250a16efd729da4a5843bdce496319&query=" +
        location +
        " & historical_date_start = 2023-04-04"
    );

    Promise.all([weather_location_info])
      .then((res) => {
        if (res[0]["status"] === 200) {
          const lat = res[0].data.location.lat;
          const lan = res[0].data.location.lon;
          const weather_data = axios.get(
            "https://api.openweathermap.org/data/2.5/onecall?lat=" +
              lat +
              "&lon=" +
              lan +
              "&units=metric&exclude=minutely,alerts&appid=dbb76c5d98d5dbafcb94441c6a10236e"
          );
          Promise.all([weather_data])
            .then((res1) => {
              dispatch({
                type: GET_WEATHER,
                payload: {
                  weather: res1[0].data,
                  location: res[0].data,
                },
              });
              dispatch({
                type: LOADER,
                payload: {
                  data: false,
                  locationMatch: true,
                },
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          dispatch({
            type: LOADER,
            payload: {
              data: false,
              locationMatch: false,
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: LOADER,
          payload: {
            data: false,
            locationMatch: false,
          },
        });
      });
  };
