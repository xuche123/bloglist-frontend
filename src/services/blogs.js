import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: {
      Authorization: token
    },
  }
  const request = axios.post(baseUrl, newObject, config)
  const response = await request
  return response.data
}

const like = async newObject => {
  const request = axios.put(`${baseUrl}/${newObject.id}`, { likes: newObject.likes+1 })
  const response = await request
  return response.data
}

const remove = async newObject => {
  const config = {
    headers: {
      Authorization: token
    },
  }
  const request = axios.delete(`${baseUrl}/${newObject.id}`, config)
  const response = await request
  return response.data
}


const exportObj = {
  setToken,
  getAll,
  create,
  like,
  remove
}

export default exportObj