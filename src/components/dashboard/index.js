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
      {isCity && <Cities />}
    </div>
  );
}
