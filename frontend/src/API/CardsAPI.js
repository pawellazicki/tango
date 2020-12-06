import Axios from 'axios';

export const getCardsForList = (listID, token) => {
    return Axios({
        url: `/cards/${listID}`,
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    })
}

export const createCard = (listID, title, endDate, token) => {
    return Axios({
        url: `/cards/add`,
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        data: {
            listID,
            cardName: title,
            deadline: endDate
        }
    })
}

export const deleteCard = (cardID, token) => {
    return Axios({
        url: `/cards/delete`,
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        data: {
            cardID,
        }
    })
}