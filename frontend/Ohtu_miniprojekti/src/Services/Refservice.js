import axios from 'axios'
const baseUrl = 'http://127.0.0.1:5000/api/refs'

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  console.log(response.data)
  return response.data
}

export default {getAll}