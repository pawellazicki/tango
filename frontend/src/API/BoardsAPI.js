import Axios from 'axios';

export const fetchBoards = async (user_id, token) => {
  return Axios.get(`/boards/${user_id}`,
    {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-type": "application/json"
      }
    });
}

export const createBoard = (title, team_name, user_id, token) => {
  return Axios({
    url: `/boards/insert/${user_id}`,
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

export const updateBoard = (id, title, team_name, token) => {
  return Axios({
    url: `/board/update`,
    method: "PUT",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    data: {
      id,
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

export const getBoard = (id, token) => {
  return Axios({
    url: `/board/${id}`,
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    }
  })
}