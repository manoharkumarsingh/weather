import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Snow from "../../resources/snow.png";
import Clouds from "../../resources/cloudy.png";
import Fog from "../../resources/foggy.png";
import Rain from "../../resources/rain.png";
import Thunderstorm from "../../resources/thunderstorm.png";
import Haze from "../../resources/haze.png";
import Clear from "../../resources/clear-sky.png";
let items = [];

function Items({ currentItems }) {
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
  return (
    <>
      {currentItems &&
        currentItems.map((item, index) => (
          <div className="hourWise">
            <div className="time">{item.hours}</div>
            <div className="weatherImg">
              <img
                src={getWeatherImgUrl(item["weather"][0]["main"])}
                alt={""}
              ></img>
            </div>
            <div className="temp">{item.temp}°C</div>
          </div>
        ))}
    </>
  );
}

function PaginatedItems({ itemsPerPage, weather_data }) {
  items = weather_data;
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  return (
    <div class="location-card">
      <div className="headerSection">
        <div className="hoursLabel">Upcoming hours : </div>
        <div className="pagination">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">>"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<<"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
      <div className="hourSection">
        <Items currentItems={currentItems} />
      </div>
    </div>
  );
}

export default PaginatedItems;
