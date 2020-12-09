import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../styles/Form.css";
import { useHistory } from "react-router-dom";
import { signUserUp } from "../action/userActions";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "../styles/modal.css";
// import { ErrorMessage } from '@hookform/error-message';

export default function RegisterForm() {
  const { register, watch, handleSubmit, errors } = useForm();

  const [somethingsWrong, setSomethingsWrong] = useState(false);
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    history.push("/login");
  };

  let history = useHistory();

  const onSubmit = (data) => {
    signUserUp(data.username, data.password, data.password_2, data.email)
      .then((response) => handleResponse(response))
      .catch(setSomethingsWrong(true));
  };

  const handleResponse = (response) => {
    if (response.data.code === "200") {
      approveRegistration();
    } else {
      setSomethingsWrong(false);
    }
  };

  const approveRegistration = () => {
    onOpenModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
        }}
      >
        <h2>Registration successfull! Redirecting to login page now.</h2>
      </Modal>
      {somethingsWrong && <span>Somethings wrong with those inputs!</span>}
      <label>username</label>
      <input
        name="username"
        placeholder="username"
        ref={register({ required: "this is required" })}
      />
      {errors.username && <span>This field is required</span>}
      <label>E-mail</label>
      <input
        name="email"
        type="email"
        placeholder="e-mail address"
        ref={register({ required: true })}
      />
      {errors.email && <span>This field is required</span>}
      <label>password</label>
      <input
        name="password"
        type="password"
        placeholder="password"
        ref={register({ required: true })}
      />
      {errors.password && <span>This field is required</span>}
      <label>repeat password</label>
      <input
        name="password_2"
        type="password"
        placeholder="repeat password"
        ref={register({
          required: true,
          validate: (value) => {
            return value === watch("password");
          },
        })}
      />
      {errors.password_2 && <span></span>}
      <input type="submit" value="Register" />
    </form>
  );
}
