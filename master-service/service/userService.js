const axios = require('axios')

const getAllUsers = async () => {
  const response = await axios.get(`${process.env.USER_SERVICE_URL}/api/user`)
  return response.data
}

const login = async (email, password) => {
  const response = await axios.post(`${process.env.USER_SERVICE_URL}/api/auth/login`, { email, password })
  return response.data
}

const createUser = async (createUserInput) => {
  const response = await axios.post(`${process.env.USER_SERVICE_URL}/api/user/register`, createUserInput)
  return response.data
}

module.exports = { getAllUsers, login, createUser }
