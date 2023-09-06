const axios = require('axios')
const FormData = require('form-data')
require('dotenv').config()

const BASE_URL = process.env.POST_SERVICE_URL

const getPosts = async (page, limit) => {
  const response = await axios.get(`${BASE_URL}/post?page=${page}&limit=${limit}`)
  return response.data
}

const getPostById = async (postId) => {
  const response = await axios.get(`${BASE_URL}/post/${postId}`)
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

const createComment = async (createCommentInput) => {
  const response = await axios.post(`${BASE_URL}/comment`, { ...createCommentInput })
  return response.data
}

const updatePost = async (postId, updatePostInput) => {
  const response = await axios.put(`${BASE_URL}/post/${postId}`, { ...updatePostInput })
  return response.data
}

const deletePost = async (postId) => {
  const response = await axios.delete(`${BASE_URL}/post/${postId}`)
  return response.data
}

module.exports = { createPost, createComment, uploadImage, getPosts, getPostById, updatePost, deletePost }
