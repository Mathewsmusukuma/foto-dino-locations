import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { axiosInstance } from "../../services/AxiosInstance";
import Loader from "../loader";
import { useParams,Link,useHistory } from "react-router-dom";

export default function LocationDetails() {
  const [location, setLocation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  let { locationId } = useParams();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`locations/${locationId}/`);
      setLocation(response.data);
      setIsLoading(false);

    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`locations/${id}/`);
      if(response.status === 204){
          history.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3 className="title py-3">Location Details</h3>

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
              <div className="col-sm">{location?.name}</div>
              <div className="col-sm">
                {location?.email}
              </div>
              <div className="col-sm">

                <Link
                  to={`/location/${location?.id}/update`}
                    className="float-end m-1 btn btn-primary"
                  >
                    Update
                  </Link>
                  <Button
                  onClick={() => {
                    handleDelete(location?.id)
                  }}
                  className="float-end m-1 btn btn-danger"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
     <Link to="/location/create/"  className="float">
        <FontAwesomeIcon icon={faPlus} className="my-float" />
      </Link>
    </div>
  );
}
