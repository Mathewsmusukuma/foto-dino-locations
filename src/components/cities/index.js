import React, { useEffect, useState } from "react";
import UpdateCity from "../city-update";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import CreateCity from "../create-city";
import { Link} from "react-router-dom";
import { axiosInstance } from "../../services/AxiosInstance";
import Loader from "../loader";

export default function Cities() {
  const [cities, setCities] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isAddCity, setIsAddCity] = useState(false);
  const [cityData, setCityData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const ASC = "ascending";

  const sortByCode = (a, b, order = ASC) => {
    const diff = a.code - b.code;

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
      setIsLoading(true)
      const response = await axiosInstance.get("cities/");
      const data = response.data;
      setCities(data);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`cities/${id}/`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (data) => {
    const payload = { data };
    try {
      setIsLoading(true)
      const response = await axiosInstance.get("cities/", payload);
      const data = response.data;
      setCities(data);
      setIsLoading(false)
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
        const textResult = cities.sort(sortByText);
        setCities(() => [...textResult]);
        break;

      case "code":
        const codeResult = cities.sort(sortByCode);
        setCities(() => [...codeResult]);
        break;

      default:
        setCities(cities);
    }
  };

  return (
    <div>
      <h3 className="title py-3">List of Cities</h3>

      <div className="container shadow py-3">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <div className="small fw-light">Search City</div>
            <form onSubmit={handleSubmit(handleSearch)}>
              <div className="input-group">
                <input
                  className="form-control border-end-0 border rounded-pill"
                  type="search"
                  id="example-search-input"
                  {...register("keyword", { required: true })}
                />
                <span className="input-group-append">
                  <button
                    className="btn btn-outline-secondary bg-white border-bottom-0 border rounded-pill ms-n5"
                    type="submit"
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </span>
              </div>
            </form>
            <select className="form-select mt-4" onChange={handleSort}>
              <option value="">Select</option>
              <option value="name">Sort by name</option>
              <option value="code">Sort by code</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading && <Loader />}

      {!isLoading &&
        cities?.map((data) => (
          <>
            <div className="container mt-6">
              <div className="row">
                <div className="col-sm">{data?.name}</div>
                <div className="col-sm">
                  City code
                  {data?.code}
                </div>
                <div className="col-sm">
                  <Link
                  to={`/city/${data.id}/details`}
                    className="float-end m-1"
                  >
                    City details
                  </Link>
                </div>
              </div>
            </div>
          </>
        ))}

      <Link to="/city/create/"  className="float">
        <FontAwesomeIcon icon={faPlus} className="my-float" />
      </Link>
    </div>
  );
}
