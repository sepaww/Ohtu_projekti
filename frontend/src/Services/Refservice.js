import axios from 'axios'
const baseUrl = '/api/refs'

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const postNew = async (object) => {
  console.log(object)
  const ConfigHeaders = {
    "content-type": "application/json"
  }
  const response = await axios({url: baseUrl,
                          method: "post",
                          data: object,
                          headers: ConfigHeaders
                          })
  console.log(response)
  return response
}

const deleteRef = async (citekey) => {
  const response = await axios.delete(`${baseUrl}/${citekey}`)
  return response
}

export default {getAll, postNew, deleteRef}