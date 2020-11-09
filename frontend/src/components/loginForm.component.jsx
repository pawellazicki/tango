import React from "react";
import { useForm } from "react-hook-form";
import "../styles/Form.css"

export default function LoginForm() {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>E-mail</label>
            <input name="email" defaultValue="test" ref={register({required: true})} />
            {errors.email && <span>This field is required</span>}
            <label>password</label>
            <input name="password" ref={register({ required: true })} />
            {errors.password && <span>This field is required</span>}

            <input type="submit" value="Log in"/>
        </form>
    );
}