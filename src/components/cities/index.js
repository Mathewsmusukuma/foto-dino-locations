import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import { axiosInstance } from "../../services/AxiosInstance";
import Loader from "../loader";

export default function Cities() {
  const [cities, setCities] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
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

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("cities/");
      const data = response.data;
      setCities(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!searchKeyword) return;
    const res = cities.filter((cities) => {
      if (cities.name?.toLowerCase().includes(searchKeyword?.toLowerCase()))
        return true;
      if (
        cities.code
          ?.toLowerCase()
          .includes(searchKeyword?.toLowerCase())
      )
        return true;
      return false;
    });
    setSearchData(res);
  }, [searchKeyword, cities]);

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
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
            <form>
              <div className="input-group">
                <input
                  className="form-control border-end-0 border rounded-pill"
                  type="search"
                  id="example-search-input"
                  value={searchKeyword}
                  onChange={handleSearch}
                />
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

      <>{}</>

      {isLoading && <Loader />}

      {searchData.length != 0
        ? searchData?.map((data) => (
            <div className="container mt-6" key={data.id}>
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
          ))
        : cities?.map((data) => (
            <div className="container mt-6" key={data.id}>
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
          ))}

      <Link to="/city/create/" className="float">
        <FontAwesomeIcon icon={faPlus} className="my-float" />
      </Link>
    </div>
  );
}
