import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { axiosInstance } from "../../services/AxiosInstance";
import Loader from "../loader";
import { useParams,Link, useHistory} from "react-router-dom";

export default function CityDetails() {
  const [cities, setCities] = useState([]);
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const history = useHistory();
  useEffect(() => {
    fetchData();
  }, []);

  let { cityId } = useParams();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`cities/${cityId}/`);
      const data = response.data;
      console.log(data);
      setCities(data);
      setIsLoading(false);
      if (data.id) {
        setIsLocationLoading(true);
        const response = await axiosInstance.get("locations/", {
          city_id: cityId,
        });
        console.log("location ", response.data);
        setLocations(response.data);
        setIsLocationLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`cities/${id}/`);
      console.log(response.data);
      if(response.status === 204){
        history.replace("/")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3 className="title py-3">City Details</h3>

      <div className="container shadow py-3">
        <div className="row">
          <div className="col-md-5 mx-auto"></div>
        </div>
      </div>

      {isLoading && <Loader />}

      {!isLoading && (
        <>
          <div className="container m-8">
            <div className="row">
              <div className="col-sm">{cities?.name}</div>
              <div className="col-sm">
                City code
                {cities?.code}
              </div>
              <div className="col-sm">
              <Link
                  to={`/city/${cities.id}/update`}
                    className="float-end m-1 btn btn-primary"
                  >
                    Update
                  </Link>
                <Button
                  onClick={()=>handleDelete(cities.id)}
                  className="float-end m-1 btn-danger"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      <div>
        <div className="container py-3">
          <div className="row">
            <div className="col-md-5 mx-auto">Locations</div>
          </div>
        </div>

        {isLocationLoading && (
          <>
            <div>
              <span className="d-flex align-items-center justify-content-center">
                Pulling locations...
              </span>
              <Loader />
            </div>
          </>
        )}
        {!isLocationLoading && (
          <>
            {locations.map((data) => (
              <div className="container m-8" key={data.id}>
                <div className="row">
                  <div className="col-sm">{data?.name}</div>
                  <div className="col-sm">{data?.email}</div>
                  <div className="col-sm">{data?.phone}</div>
                  <div className="col-sm">
                    <Link
                      to={`/location/${data.id}/details`}
                      className="float-end m-1 btn btn-primary"
                    >
                      Location Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <Link to="/city/create/"  className="float">
        <FontAwesomeIcon icon={faPlus} className="my-float" />
      </Link>
    </div>
  );
}
