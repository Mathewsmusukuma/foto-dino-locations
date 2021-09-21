import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../services/AxiosInstance";

export default function CreateCity() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreate = async (data) => {
    const payload = data;
    try {
      const response = await axiosInstance.post("cities/", payload);
      console.log(response.data);
      if (response.data.id) {
        history.replace("/");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleCreate)}>
        <div className="">
          <label for="exampleFormControlInput1" className="form-label">
            Enter city name
          </label>
          <input
            className="form-control form-control-lg py-1"
            type="text"
            {...register("name", { required: true })}
            aria-label="City"
          />
          {errors.name && (
            <span className="alert alert-danger p-1 mt-8" role="alert">
              City name is required
            </span>
          )}
        </div>
        <div className="">
          <label for="exampleFormControlInput1" className="form-label">
            Enter city code
          </label>
          <input
            className="form-control form-control-lg py-1 mt-2"
            type="number"
            {...register("code", { required: true })}
            aria-label="code"
          />
        </div>
        {errors.code && (
          <span className="alert alert-danger p-1" role="alert">
            City code is required
          </span>
        )}

        <Button type="submit" className="float-end">
          Add City
        </Button>
      </form>
    </>
  );
}
