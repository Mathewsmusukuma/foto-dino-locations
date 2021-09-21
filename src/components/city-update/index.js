import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../services/AxiosInstance";

export default function UpdateCity() {
  const history = useHistory();
  let { cityId } = useParams();
  const { register, reset, handleSubmit } = useForm();

  const setForm = async () => {
    try {
      const response = await axiosInstance.get(`cities/${cityId}/`);
      reset({ name: response.data.name, code: response.data.code });
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
      const response = await axiosInstance.put(`cities/${cityId}/`, new_data);
      if (response.data.id) {
        history.replace("/")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleUpdate)}>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Enter city name
          </label>
          <input
            className="form-control form-control-lg py-1"
            type="text"
            {...register("name", { required: true })}
            aria-label="City"
          />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Enter city code
          </label>
          <input
            className="form-control form-control-lg py-1"
            type="text"
            {...register("code", { required: true })}
            aria-label="code"
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary float-end">
            Update
          </button>
        </div>
      </form>
    </>
  );
}
