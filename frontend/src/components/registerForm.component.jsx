import React from "react";
import { useForm } from "react-hook-form";
import "../styles/Form.css"
import { useHistory } from "react-router-dom";
import { signUserUp } from "../action/userActions"
import { useDispatch } from 'react-redux'

export default function RegisterForm() {
    const { register, handleSubmit, errors } = useForm();

    let history = useHistory();
    const dispatch = useDispatch()

    const redirectOrError = () => {
        history.push("/login")
    };

    const onSubmit = data => {
        dispatch(signUserUp(data.username, data.password, data.password_2, data.email));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>username</label>
            <input name="username" placeholder="username" ref={register({required: true})} />
            {errors.username && <span>This field is required</span>}
            <label>E-mail</label>
            <input name="email" placeholder="e-mail address" ref={register({required: true})} />
            {errors.email && <span>This field is required</span>}
            <label>password</label>
            <input name="password" type="password" placeholder="password" ref={register({ required: true })} />
            {errors.password && <span>This field is required</span>}
            <label>repeat password</label>
            <input name="password_2" type="password_2" placeholder="repeat password" ref={register({ required: true })} />
            {errors.password_2 && <span>This field is required</span>}

            <input type="submit" value="Register"/>
        </form>
    );
}