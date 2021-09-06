import axios from 'axios'

export async function getUser (id) {
  if (id) {
    return await axios.get(`http://localhost:5000/api/discord/users/${id}`, {
      withCredentials: true
    })
  } else {
    return await axios.get('http://localhost:5000/api/discord/users', {
      withCredentials: true
    })
  }
}
