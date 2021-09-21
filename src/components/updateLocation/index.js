import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../services/AxiosInstance";
import { useParams, useHistory } from "react-router-dom";

export default function UpdateLocation() {
  const [cities, setCities] = useState([]);
  const { locationId } = useParams();
  const history = useHistory();

  const getCites = async () => {
    try {
      const response = await axiosInstance.get("cities/");
      setCities(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getCites();
  }, [getCites]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const setForm = async () => {
    try {
      const response = await axiosInstance.get(`locations/${locationId}/`);
      if (response.data.id) {
        reset(response.data);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    setForm();
  }, []);

  const handleUpdate = async (data) => {
    const new_data = data;
    try {
      const response = await axiosInstance.put(
        `locations/${locationId}/`,
        new_data
      );
      if (response.data.id) {
        history.replace("/");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Enter location name
          </label>
          <input
            className="form-control form-control-lg py-1"
            type="text"
            placeholder="Enter location name"
            {...register("name", { required: true })}
            aria-label="Location"
          />
          {errors.name && (
            <span className="alert alert-danger p-1" role="alert">
              Location name is required
            </span>
          )}
        </div>

        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Enter email address
          </label>
          <input
            className="form-control form-control-lg py-1"
            type="text"
            placeholder="Enter email address"
            {...register("email", { required: true })}
            aria-label="Email"
          />
          {errors.email && (
            <span className="alert alert-danger p-1" role="alert">
              Location email is required
            </span>
          )}
        </div>

        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Enter phone number
          </label>
          <input
            className="form-control form-control-lg py-1"
            type="text"
            placeholder="Enter phone number"
            {...register("phone", { required: true })}
            aria-label="Phone"
          />
          {errors.phone && (
            <span className="alert alert-danger p-1" role="alert">
              Location phone is required
            </span>
          )}
        </div>

        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Enter street number
          </label>
          <input
            className="form-control form-control-lg py-1"
            type="text"
            placeholder="Enter street number"
            {...register("street_number", { required: true })}
            aria-label="Street number"
          />

          {errors.street_number && (
            <span className="alert alert-danger p-1" role="alert">
              Street number is required
            </span>
          )}
        </div>

        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Enter street name
          </label>
          <input
            className="form-control form-control-lg py-1"
            type="text"
            placeholder="Enter street name"
            {...register("street_name", { required: true })}
            aria-label="Street name"
          />
          {errors.street_name && (
            <span className="alert alert-danger p-1" role="alert">
              Street name is required
            </span>
          )}
        </div>

        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Enter postal code
          </label>
          <input
            className="form-control form-control-lg py-1"
            placeholder="Enter postal code"
            type="text"
            {...register("postal_code", { required: true })}
            aria-label="postal_code"
          />
          {errors.post_code && (
            <span className="alert alert-danger p-1" role="alert">
              Postal code is required
            </span>
          )}
        </div>

        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Enter state 'available or unavailable
          </label>
          <select
            className="form-control form-control-lg py-1"
            placeholder="Enter state 'available or unavailable"
            type="text"
            {...register("status", { required: true })}
            aria-label="status"
          >
            <option value="">Select Sataus</option>
            <option className="Available">Available</option>
            <option className="Unavailable">Unavailable</option>
          </select>
          {errors.status && (
            <span className="alert alert-danger p-1" role="alert">
              Location status is required
            </span>
          )}
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Select City
          </label>
          <select
            className="form-control form-control-lg py-1"
            placeholder="Enter state 'available or unavailable"
            type="text"
            {...register("city", { required: true })}
            aria-label="city"
          >
            {cities?.map((data) => (
              <option value={data.id}>{data.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Enter rent price
          </label>
          <input
            className="form-control form-control-lg py-1"
            placeholder="Enter state 'available or unavailable"
            type="text"
            {...register("rent", { required: true })}
            aria-label="rent"
          />
        </div>
        <Button type="submit" className="float-end">
          Update
        </Button>
      </form>
   
   </>
  );
}
