import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../services/AxiosInstance";

export default function UpdateCity(props) {
  const [show, setShow] = useState(false);

  const { register, reset, handleSubmit } = useForm();

  const setForm = () => {
    reset({ name: props.updatedata.name });
  };

  useEffect(() => {
    setForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = async (data) => {
    const new_data = { ...props.updateData, name: data["name"] };
    try {
      const response = await axiosInstance.put(
        `cities/${props.updatedata.id}/`,
        new_data
      );
      const data = response.data;
      if (data.id) setShow(true);
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
        show={props.show}
        onHide={show}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit City
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <Modal.Body>
            <input
              className="form-control form-control-lg py-1"
              type="text"
              {...register("name", { required: true })}
              aria-label="City"
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
