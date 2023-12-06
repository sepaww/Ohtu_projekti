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

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', readFilename(response));
    document.body.appendChild(link);
    link.click();
  } catch(error) {
    console.log("bonkers")
  }
}

export default {getAll, postNew, deleteRef, download}