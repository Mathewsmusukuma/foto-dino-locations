import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateCity from "../city-update";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import CreateCity from "../create-city";

export default function Cities() {
  const [cities, setCities] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isAddCity, setIsAddCity] = useState(false);
  const [cityData, setCityData] = useState([]);

  const instance = axios.create({
    baseURL: "https://api.photodino.com/locations/",
    withCredentials: false,
    headers: {},
  });
  useEffect(() => {
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchData = async () => {
    try {
      const response = await instance.get("cities/");
      const data = response.data;
      console.log(data);
      setCities(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await instance.delete(`cities/${id}/`);
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (data) => {
    const searchKey = data["keyword"];
    console.log(searchKey);
    try {
      const response = await instance.get("cities/", { name: "test" });
      const data = response.data;
      console.log(data);

      setCities(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreateCity = () =>{
      setIsAddCity(true)
  }

  return (
    <div>
      <h5 class="card-title">List of Cities</h5>

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
                  {...register("keyword", { required: true })}
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
            <button 
            className="btn btn-outline-primary ml-8 float-end add-city" 
            onClick={() => handleCreateCity()}
            >
              Add City
            </button>
          </div>
        </div>
      </div>

      {cities &&
        cities.map((data) => (
          <>
            <ul class="list-group">
              <li class="list-group-item m-2">
                {data.name}{" "}
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
                  onClick={() => handleDelete(data.id)}
                  className="m-1 float-end"
                >
                  Delete
                </Button>
              </li>
            </ul>
          </>
        ))}
      {isEdit && (
        <UpdateCity
          show={isEdit}
          onHide={() => setIsEdit(false)}
          updatedata={cityData}
        />
      )}
      {isAddCity && (
        <CreateCity
          show={isAddCity}
          onHide={() => setIsAddCity(false)}
        />
      )}
    </div>
  );
}
