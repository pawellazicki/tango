import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../styles/Form.css";
import { useHistory } from "react-router-dom";
import {
  fetchUser,
  loginFailure,
  loginRequest,
  loginSuccess,
} from "../action/userActions";
import { useDispatch } from "react-redux";

export default function LoginForm() {
  const { register, handleSubmit, errors } = useForm();

  const [failedToLogin, setFailedToLogin] = useState(false);

  let history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(loginRequest());
    fetchUser(data.username, data.password).then((response) =>
      readAuthResponse(response)
    );
    // .catch(onLoginFailure);
  };

  const readAuthResponse = (response) => {
    if (response.data.message) {
      onLoginFailure();
    } else {
      onLoginSuccess(response);
    }
  };

  const onLoginSuccess = (response) => {
    setFailedToLogin(false);
    localStorage.setItem("token", response.data.token);
    dispatch(loginSuccess());
    redirectToBoards();
  };

  const onLoginFailure = () => {
    setFailedToLogin(true);
    dispatch(loginFailure());
  };

  const redirectToBoards = () => {
    history.push("/boards");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {failedToLogin && <span>Wrong credentials</span>}

        <label>username</label>
        <input
          name="username"
          placeholder="username"
          ref={register({ required: true })}
        />
        {errors.userName && <span>This field is required</span>}
        <label>password</label>
        <input
          name="password"
          type="password"
          placeholder="password"
          ref={register({ required: true })}
        />
        {errors.password && <span>This field is required</span>}
        <input type="submit" value="Log in" />
      </form>
    </div>
  );
}
