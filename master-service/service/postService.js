const axios = require('axios')
const FormData = require('form-data')
require('dotenv').config()

const BASE_URL = process.env.POST_SERVICE_URL

const getPosts = async (id) => {
  const response = await axios.get(`${BASE_URL}/post`)
  return response.data
}

const uploadImage = async (files) => {
  const formData = new FormData()
  files.forEach((file, index) => {
    const filename = `image_${index}.jpg`
    const fileBuffer = Buffer.from(file, 'base64')
    formData.append('files', fileBuffer, { filename })
  })
  const response = await axios.post(`${BASE_URL}/post/uploads`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

const createPost = async (createPostInput) => {
  const images = await uploadImage(createPostInput.images)
  const response = await axios.post(`${BASE_URL}/post`, {
    caption: createPostInput.caption,
    author: createPostInput.author,
    images
  })
  return response.data
}

module.exports = { createPost, uploadImage, getPosts }
