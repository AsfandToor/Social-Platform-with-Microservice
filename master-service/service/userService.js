const axios = require('axios')
const FormData = require('form-data')
const { GraphQLError } = require('graphql')
require('dotenv').config()

const BASE_URL = process.env.USER_SERVICE_URL

const getAllUsers = async () => {
  const response = await axios.get(`${process.env.USER_SERVICE_URL}/api/user`)
  return response.data
}

const login = async (email, password) => {
  try {
    const response = await axios.post(`${process.env.USER_SERVICE_URL}/api/auth/login`, { email, password })
    return response.data
  } catch (e) {
    console.log(e)
    throw new GraphQLError(e.response.data, {
      extensions: {
        code: e.response.statusText.replace(/\s/g, '_')
      }
    })
  }
}

const uploadImage = async (files) => {
  const formData = new FormData()
  files.forEach((file, index) => {
    const filename = `image_${index}.jpg`
    const fileBuffer = Buffer.from(file, 'base64')
    formData.append('image', fileBuffer, { filename })
  })
  const response = await axios.post(`${BASE_URL}/api/user/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

const createUser = async (createUserInput) => {
  const { image } = await uploadImage([createUserInput.image])
  const data = {
    ...createUserInput,
    image
  }
  const response = await axios.post(`${process.env.USER_SERVICE_URL}/api/user/register`, data)
  return response.data
}

module.exports = { getAllUsers, login, createUser }
