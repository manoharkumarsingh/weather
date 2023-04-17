import { GET_WEATHER, LOADER } from "../constant";

const initialState = {
  weather_data: {},
  location: {},
  loader: false,
  locationMatch: true,
};

const weather = (state = initialState, action) => {
  switch (action.type) {
    case GET_WEATHER: {
      return {
        ...state,
        weather_data: action.payload.weather,
        location: action.payload.location,
      };
    }

    case LOADER: {
      return {
        ...state,
        loader: action.payload.data,
        locationMatch: action.payload.locationMatch,
      };
    }
    default:
      return state;
  }
};

export default weather;
