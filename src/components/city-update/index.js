import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../services/AxiosInstance";

export default function UpdateCity(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false);}
  const { register, reset, handleSubmit } = useForm();

  const setForm = () => {
    reset({ name: props.updatedata.name, code: props.updatedata.code});
  };

  useEffect(() => {
    setShow(props.show)
    setForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = async (data) => {
    const new_data = { ...props.updateData, name: data["name"], code: data["code"] };
    try {
      const response = await axiosInstance.put(
        `cities/${props.updatedata.id}/`,
        new_data
      );
      if (response.data.id) {
          setShow(false);
          handleClose();
          window.location.href = "/";

      }
    } catch (error) {
      console.log(error);
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
            Edit City
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(handleUpdate)}>
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
                className="form-control form-control-lg py-1"
                type="text"
                {...register("code", { required: true })}
                aria-label="code"
              />
            </div>
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
