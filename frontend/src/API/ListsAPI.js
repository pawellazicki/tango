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

export const deleteList = (listID, token) => {
    return Axios({
        url: `/lists/delete`,
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        data: {
            listID: listID
        }
    })
}

export const createList = (title, boardID, token) => {
    return Axios({
        url: `/lists/add`,
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        data: {
            boardID,
            title
        }
    })
}

export const updateList = (listID, newTitle, token) => {
    return Axios({
        url: '/lists/edit',
        method: 'PATCH',
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        data: {
            listID,
            newTitle
        }
    })
}