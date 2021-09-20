import React, { useState, useEffect} from "react";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../services/AxiosInstance";

export default function CreateLocation(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false);}
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    setShow(true);
  })
  const handleCreate = async (data) => {
    const payload = data;
    try {
      const response = await axiosInstance.post("locations/", payload);
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
            CREATE LOCATION
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(handleCreate)}>
          <Modal.Body>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Enter hotel name
              </label>
              <input
                className="form-control form-control-lg py-1"
                type="text"
                placeholder="Enter location name"
                {...register("name", { required: true })}
                aria-label="Location"
              />
            </div>

            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Enter email address
              </label>
              <input
                className="form-control form-control-lg py-1"
                type="text"
                placeholder="Enter email address"
                {...register("email", { required: true })}
                aria-label="Email"
              />
            </div>

            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Enter phone number
              </label>
              <input
                className="form-control form-control-lg py-1"
                type="text"
                placeholder="Enter phone number"
                {...register("phone", { required: true })}
                aria-label="Phone"
              />
            </div>

            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Enter street number
              </label>
              <input
                className="form-control form-control-lg py-1"
                type="text"
                placeholder="Enter street number"
                {...register("street_number", { required: true })}
                aria-label="Street number"
              />
            </div>

            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Enter street name
              </label>
              <input
                className="form-control form-control-lg py-1"
                type="text"
                placeholder="Enter street name"
                {...register("street_name", { required: true })}
                aria-label="Street name"
              />
            </div>

            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Enter postal code
              </label>
              <input
                className="form-control form-control-lg py-1"
                placeholder="Enter postal code"
                type="text"
                {...register("postal_code", { required: true })}
                aria-label="postal_code"
              />
            </div>

            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Enter state 'available or unavailable
              </label>
              <input
                className="form-control form-control-lg py-1"
                placeholder="Enter state 'available or unavailable"
                type="text"
                {...register("status", { required: true })}
                aria-label="status"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Enter city ID
              </label>
              <input
                className="form-control form-control-lg py-1"
                placeholder="Enter state 'available or unavailable"
                type="text"
                {...register("city", { required: true })}
                aria-label="city"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
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
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Add Location</Button>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
