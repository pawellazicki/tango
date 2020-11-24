import React from "react";
import { useForm } from "react-hook-form";
import "../styles/Form.css"

export default function RegisterForm() {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);

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

            <input type="submit" value="Register"/>
        </form>
    );
}