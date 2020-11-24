import axios from 'axios';

export const fetchBoards = async (token) => {
  return axios.get('/boards',
  {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-type": "application/json"
    }
  });
}