import Axios from 'axios';

export const fetchBoards = async (token) => {
  return Axios.get('/boards',
    {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-type": "application/json"
      }
    });
}

export const createBoard = (title, team_name, token) => {
  return Axios({
    url: '/boards/insert',
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    data: {
      title,
      team_name
    }
  })
}

export const deleteBoard = (id, token) => {
  return Axios({
    url: '/boards/remove',
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    data: {
      id
    }
  })
}