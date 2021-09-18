import React, { useState } from "react";
import Cities from "../cities";
import Locations from "../locations";

export default function Dashboard() {
  const [isLocation, setIsLocation] = useState(false);
  const [isCity, setIstCity] = useState(true);

  const handleLocationView = () => {
    setIstCity(false);
    setIsLocation(true);
  };

  const handleCityView = () => {
    setIstCity(true);
    setIsLocation(false);
  };
  return (
    <div>
      <div class="col-md-5 mx-auto">
        <button
          className="btn btn-info btn-lg btn-square m-2"
          onClick={handleCityView}
        >
         View Cities
        </button>
        <button
          className="btn btn-success btn-lg btn-square m-2"
          onClick={handleLocationView}
        >
         View Locations
        </button>
      </div>

      {isCity && <Cities />}
      {isLocation && <Locations />}
    </div>
  );
}
