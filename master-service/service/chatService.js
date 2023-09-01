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

const createChat = async (data) => {
  const response = await axios.post(`${BASE_URL}/api/chats`, data)
  return response.data
}

const createMessage = async (data) => {
  const response = await axios.post(`${BASE_URL}/api/messages`, data)
  return response.data
}

const updateChat = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/api/chats/${id}`, { name: data })
  return response.data
}

const updateMessage = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/api/messages/${id}`, { message: data })
  return response.data
}

const deleteChat = async (id) => {
  const response = await axios.delete(`${BASE_URL}/api/chats/${id}`)
  return response.data
}

const deleteMessage = async (id) => {
  const response = await axios.delete(`${BASE_URL}/api/messages/${id}`)
  return response.data
}

module.exports = { getAllChats, getChatById, createChat, updateChat, deleteChat, createMessage, updateMessage, deleteMessage }
