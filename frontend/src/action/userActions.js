// Action Creators

import Axios from "axios"

const setUser = () => ({ type: "SET_USER"})

export const logUserOut = () => ({type: "LOG_OUT"})

export const loginRequest = () => ({type: "LOGIN_REQUEST"})

export const loginSuccess = () => ({type: "LOGIN_SUCCESS"})

export const loginFailure = () => ({type: "LOGIN_FAILURE"})

// Methods

export const fetchUser = (username, password) => {
    return Axios({
        method: "POST",
        url: '/auth/signin',
        data:{
            username: username,
            password, password
        }
    })
}

export const signUserUp = (username, password, password_2, email,  callback) => {
    return Axios({
        url: '/auth/signup',
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        data: {
            username,
            password,
            password_2,
            email
        }
    })
}

export const autoLogin = () => dispatch => {
    fetch(`http://localhost:4000/auto_login`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(res => res.json())
    .then(data => {
        // data sent back will in the format of
        // {
        //     user: {},
        //.    token: "aaaaa.bbbbb.bbbbb"
        // }
        localStorage.setItem("token", data.token)
        dispatch(setUser(data.user))
    })
}