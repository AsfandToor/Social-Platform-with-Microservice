const axios = require('axios')
require('dotenv').config()

const BASE_URL = process.env.CHAT_SERVICE_URL

const getChatById = async (id) => {
  const response = await axios.get(`${BASE_URL}/api/chats/${id}`)
  return response.data
}

const getAllChats = async () => {
  const response = await axios.get(`${BASE_URL}/api/chats`)
  return response.data
}

module.exports = { getAllChats, getChatById }
