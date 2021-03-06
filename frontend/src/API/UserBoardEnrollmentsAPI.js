import Axios from 'axios';

export const connectUserWithBoard = (user_id, board_id, token) => {
  return Axios({
    url: `/user_board_enrollments/insert`,
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    data: {
      user_id,
      board_id
    }
  })
}

export const getBoardUsers = (board_id, token) => {
  return Axios({
    url: `/user_board_enrollments/users/${board_id}`,
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    }
  })
}

export const getUserBoards = (user_id, token) => {
  return Axios({
    url: `/user_board_enrollments/boards/${user_id}`,
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    }
  })
}

export const deleteBoardEnroll = (user_id, board_id, token) => {
  return Axios({
    url: '/user_board_enrollments/remove',
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    data: {
      user_id,
      board_id
    }
  })
}