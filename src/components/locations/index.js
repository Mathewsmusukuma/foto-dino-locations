import React, { useEffect, useState } from "react";
import UpdateCity from "../city-update";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import CreateCity from "../create-city";
import { axiosInstance } from "../../services/AxiosInstance";
import Loader from "../loader";

export default function Locations() {
  const [locations, setLocations] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isAddCity, setIsAddCity] = useState(false);
  const [cityData, setCityData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const ASC = "ascending";

  const sortByEmail = (a, b, order = ASC) => {
    const diff = a.email.toLowerCase().localeCompare(b.email.toLowerCase());

    if (order === ASC) {
      return diff;
    }

    return -1 * diff;
  };

  const sortByText = (a, b, order = ASC) => {
    const diff = a.name.toLowerCase().localeCompare(b.name.toLowerCase());

    if (order === ASC) {
      return diff;
    }

    return -1 * diff;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { register, handleSubmit } = useForm();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("locations/");
      const data = response.data;
      setLocations(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`locations/${id}/`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (data) => {
    const payload = data;
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("locations/", payload);
      const data = response.data;
      setLocations(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreateCity = () => {
    setIsAddCity(true);
  };

  const handleSort = (e) => {
    const sortChoice = e.target.value;
    switch (sortChoice) {
      case "name":
        const textResult = locations.sort(sortByText);
        setLocations(() => [...textResult]);
        break;

      case "email":
        const emailResult = locations.sort(sortByEmail);
        setLocations(() => [...emailResult]);
        break;

      default:
        setLocations(locations);
    }
  };

  return (
    <div>
      <h3 class="title py-3">List of Hotels</h3>

      <div class="container shadow py-3">
        <div class="row">
          <div class="col-md-5 mx-auto">
            <div class="small fw-light">Search Location</div>
            <form onSubmit={handleSubmit(handleSearch)}>
              <div class="input-group">
                <input
                  class="form-control border-end-0 border rounded-pill"
                  type="search"
                  id="example-search-input"
                  {...register("search", { required: true })}
                />
                <span class="input-group-append">
                  <button
                    class="btn btn-outline-secondary bg-white border-bottom-0 border rounded-pill ms-n5"
                    type="submit"
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </span>
              </div>
            </form>
            <select className="form-select mt-4" onChange={handleSort}>
              <option value="">Select</option>
              <option value="name">Filter by name</option>
              <option value="emai">Filter by email</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading && <Loader />}

      <table class="table table-bordered table-hover">
        {!isLoading && (
          <>
            <thead class="thead-dark">
              <tr>
                <th scope="col">Hotel Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {locations &&
                locations?.map((data) => (
                  <>
                    <tr>
                      <th scope="row">{data?.name}</th>
                      <td>{data?.email}</td>
                      <td>{data?.phone}</td>
                      <td>{data?.status}</td>
                      <td>
                        {" "}
                        <Button
                          onClick={() => {
                            setIsEdit(true);
                            setCityData(data);
                          }}
                          className="float-end m-1"
                        >
                          Edit
                        </Button>{" "}
                        <Button
                          onClick={() => handleDelete(data?.id)}
                          className="m-1 float-end"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  </>
                ))}
            </tbody>
          </>
        )}
      </table>

      {isEdit && (
        <UpdateCity
          show={isEdit}
          onHide={() => setIsEdit(false)}
          updatedata={cityData}
        />
      )}
      {isAddCity && (
        <CreateCity show={isAddCity} onHide={() => setIsAddCity(false)} />
      )}

      <button onClick={() => handleCreateCity()} className="float">
        <FontAwesomeIcon icon={faPlus} className="my-float" />
      </button>
    </div>
  );
}
