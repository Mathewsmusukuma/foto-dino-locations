import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../services/AxiosInstance";

export default function CreateCity(props) {
  const [show, setShow] = useState(false);


  const handleClose = () => {setShow(false);}
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    setShow(props.show)
  })
  const handleCreate = async (data) => {
    const payload = { ...data, locations: [data["locations"].split(" ")] };
    try {
      const response = await axiosInstance.post("cities/", payload);
      console.log(response.data);
      if (response.data.id) {
        setShow(false);
        handleClose();
        window.location.href = "/";

    }
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Create City
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(handleCreate)}>
          <Modal.Body>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Enter city name
              </label>
              <input
                className="form-control form-control-lg py-1"
                type="text"
                {...register("name", { required: true })}
                aria-label="City"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Enter city code
              </label>
              <input
                className="form-control form-control-lg py-1 mt-2"
                type="number"
                {...register("code", { required: true })}
                aria-label="code"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Enter locations
              </label>
              <input
                className="form-control form-control-lg py-1 mt-2"
                placeholder="Enter locations"
                type="text"
                {...register("locations", { required: true })}
                aria-label="locations"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Add City</Button>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
