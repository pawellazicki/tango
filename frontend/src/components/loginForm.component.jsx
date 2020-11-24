import React  from "react";
import { useForm } from "react-hook-form";
import "../styles/Form.css"
import { useHistory } from "react-router-dom";
import { fetchUser } from "../action/userActions"
import { useDispatch } from 'react-redux'

export default function LoginForm() {
    const { register, handleSubmit, errors } = useForm();

    let history = useHistory();
    const dispatch = useDispatch()

    const onSubmit = data => {
        dispatch(fetchUser(data.username, data.password, redirectToBoards));        
    }

    const redirectToBoards = () => {
        history.push("/boards");
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>username</label>
            <input name="username" placeholder="username" ref={register({required: true})} />
            {errors.userName && <span>This field is required</span>}
            <label>password</label>
            <input name="password" type="password" placeholder="password"ref={register({ required: true })} />
            {errors.password && <span>This field is required</span>}
            <input type="submit" value="Log in"/>
        </form>
    );

}
