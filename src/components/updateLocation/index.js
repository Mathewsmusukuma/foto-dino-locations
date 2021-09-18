import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../services/AxiosInstance";

export default function UpdateLocation(props) {
  const [show, setShow] = useState(false);

  const { register, reset, handleSubmit } = useForm();

  const setForm = () => {
    console.log(props.updatedata);
    reset(props.updatedata);
  };

  useEffect(() => {
    setForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = async (data) => {
    const new_data = data;
    try {
      const response = await axiosInstance.put(
        `location/${props.updatedata.id}/`,
        new_data
      );
      console.log(response .data);
      if (response.data.id) setShow(false);
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
        show={props.show}
        onHide={show}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            EDIT LOCATION
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <Modal.Body>
            <input
              className="form-control form-control-lg py-1 mt-2"
              type="text"
              placeholder="Enter location name"
              {...register("name", { required: true })}
              aria-label="Location"
            />
            <input
              className="form-control form-control-lg py-1 mt-2"
              type="text"
              placeholder="Enter email address"
              {...register("email", { required: true })}
              aria-label="Email"
            />
            <input
              className="form-control form-control-lg py-1 mt-2"
              type="text"
              placeholder="Enter phone number"
              {...register("phone", { required: true })}
              aria-label="Phone"
            />
            <input
              className="form-control form-control-lg py-1 mt-2"
              type="text"
              placeholder="Enter street number"
              {...register("street_number", { required: true })}
              aria-label="Street number"
            />
            <input
              className="form-control form-control-lg py-1 mt-2"
              type="text"
              placeholder="Enter street name"
              {...register("street_name", { required: true })}
              aria-label="Street name"
            />
            <input
              className="form-control form-control-lg py-1 mt-2"
              placeholder="Enter postal code"
              type="text"
              {...register("postal_code", { required: true })}
              aria-label="postal_code"
            />
            <input
              className="form-control form-control-lg py-1 mt-2"
              placeholder="Enter state 'available or unavailable"
              type="text"
              {...register("status", { required: true })}
              aria-label="status"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Update</Button>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}