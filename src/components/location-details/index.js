import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { axiosInstance } from "../../services/AxiosInstance";
import Loader from "../loader";
import { useParams, Link, useHistory } from "react-router-dom";

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
      if (response.status === 204) {
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
            <table class="table table-borderless table-responsive card-1 p-4">
              <thead>
                <tr class="border-bottom">
                  <th>
                    {" "}
                    <span class="ml-2">Location name</span>{" "}
                  </th>
                  <th>
                    {" "}
                    <span class="ml-2">Email Address</span>{" "}
                  </th>
                  <th>
                    {" "}
                    <span class="ml-2">Phone Number</span>{" "}
                  </th>
                  <th>
                    {" "}
                    <span class="ml-2">Street name and No#</span>{" "}
                  </th>
                  <th>
                    {" "}
                    <span class="ml-2">Rent Price</span>{" "}
                  </th>
                  <th>
                    {" "}
                    <span class="ml-2">Staus</span>{" "}
                  </th>
                  <th>
                    {" "}
                    <span class="ml-4">Action</span>{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-bottom">
                  <td>
                    <div class="p-2">
                      {" "}
                      <span class="d-block font-weight-bold">
                        {location?.name}
                      </span>{" "}
                    </div>
                  </td>
                  <td>
                    <div class="p-2 d-flex flex-row align-items-center mb-2">
                      <div class="d-flex flex-column ml-2">
                        {" "}
                        <span class="d-block font-weight-bold">
                          {location?.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="p-2">
                      {" "}
                      <span class="font-weight-bold">
                        {location?.phone}
                      </span>{" "}
                    </div>
                  </td>
                  <td>
                    <div class="p-2 d-flex flex-column">
                      {" "}
                      <span> Street #  {location?.street_number}</span>{" "}
                      <span>{location?.street_name}</span>{" "}
                    </div>
                  </td>
                  <td>
                    <div class="p-2">{location?.rent} </div>
                  </td>
                  <td>
                    <div class="p-2">
                    <span class={`badge ${location?.status ==="Available"? "bg-success": "bg-secondary"}`}> {location?.status} </span>
                        </div>
                  </td>
                  <td>
                    <div class="p-2">
                      {" "}
                      <i class="fa fa-phone text-danger"></i>{" "}
                      <i class="fa fa-adjust text-danger">
                        {" "}
                        <Link
                          to={`/location/${location?.id}/update`}
                          className="float-end m-1 btn btn-primary"
                        >
                          Update
                        </Link>
                      </i>{" "}
                    </div>
                  </td>
                  <td>
                    <div class="p-2">
                      {" "}
                      <i class="fa fa-phone text-danger">
                        <Button
                          onClick={() => {
                            handleDelete(location?.id);
                          }}
                          className="float-end m-1 btn btn-danger"
                        >
                          Delete
                        </Button>
                      </i>{" "}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
      <Link to="/location/create/" className="float">
        <FontAwesomeIcon icon={faPlus} className="my-float" />
      </Link>
    </div>
  );
}
