import axios from 'axios'
const baseUrl = '/api/refs'

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const postNew = async (object) => {
  try{
    const response = await axios({
      url: baseUrl, 
      method: "post",
      data: object,
      headers: {"content-type": "application/json"},
    })

    console.log(response.data)

    if (response.status === 201) {
      return response.data
    }
  } catch(error){
    if (error.response) {
      throw new Error(error.response.data.message)
    } else if (error.request) {
      throw new Error("Failed to connect to server")
    }
  }
}

const deleteRef = async (citekey) => {
  const response = await axios.delete(`${baseUrl}/${citekey}`)
  return response
}

const download = async () => {
  function readFilename(response) {
    const disposition = response.headers['content-disposition']
    return disposition.match(/\w+.bib/)[0]
  }  

  try{
    const response = await axios({
      url: `${baseUrl}/export`,
      method: 'GET',
      responseType: 'blob'
    })

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', readFilename(response))
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch(error){
    console.log("bonkers")
  }
}

export default {getAll, postNew, deleteRef, download}