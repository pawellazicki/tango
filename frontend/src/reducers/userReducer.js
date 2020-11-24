const defaultState = {
    loggedIn: false,
    // user: {}
}

const userReducer = (state = defaultState, action) => {
    switch(action.type){
        case "LOGIN_REQUEST":
            return{
                loggedIn: false
            }
        case "LOGIN_SUCCESS":
            return{
                loggedIn: true
        }
        case "LOGIN_FAILURE":
            return {
                loggedIn: false,
                // user: {...action.payload}
            }
        case "LOG_OUT":
            localStorage.clear()
            return {
                loggedIn: false,
                // user: {}
            }
        default: return state
    }
}

export default userReducer