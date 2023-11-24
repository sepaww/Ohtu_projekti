import axios from 'axios'
const baseUrl = '/api/refs'

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  console.log(response.data)
  return response.data
}

const postNew = async (object) => {
  console.log(object)
  const ConfigHeaders = {
    "content-type": "application/json"
  }
  console.log(object)
  const response = await axios({url: baseUrl,
                          method: "post",
                          data: object,
                          headers: ConfigHeaders
                          })
  console.log(response)
  return response
}

export default {getAll, postNew}