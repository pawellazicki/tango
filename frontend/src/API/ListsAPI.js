import Axios from 'axios';

export const getLists = (boardID, token) => {
    return Axios({
        url: `/lists/${boardID}`,
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    })
}