const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong' })
  }
})

blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    if (body.title === undefined || body.url === undefined)
      return response.status(400).json({ error: 'content missing' })
    if (body.likes === undefined)
      body.likes = 0
    const blog = new Blog(body)
    const savedBlog = await blog.save()

    response.status(201).json(savedBlog)
  } catch (exception) {
    response.status(500).json({ error: 'something went wrong' })
  }
})

module.exports = blogsRouter