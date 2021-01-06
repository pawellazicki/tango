import Axios from 'axios';

export const connectUserWithBoard = (user_id, board_id, token) => {
  return Axios({
    url: `/user_board_enrollments/insert/`,
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