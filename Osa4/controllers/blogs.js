const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 })
    response.json(blogs.map(Blog.format))
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong' })
  }
})

blogsRouter.post('/', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const body = request.body
    if (body.title === undefined || body.url === undefined)
      return response.status(400).json({ error: 'content missing' })
    if (body.likes === undefined)
      body.likes = 0

    const user = await User.findById(decodedToken.id)
    body.user = user._id

    const blog = new Blog(body)
    const savedBlog = await blog.save()

    user.blogs = user.blogs ? user.blogs.concat(savedBlog._id) : [savedBlog._id]
    await user.save()

    response.status(201).json(Blog.format(savedBlog))
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError')
      return response.status(401).json({ error: 'token missing or invalid' })
    response.status(500).json({ error: 'something went wrong' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    response.status(400).json({ error: 'malformatted id' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog)
      blog.likes = request.params.likes

    const savedBlog = await blog.save()
    response.status(200).json(Blog.format(savedBlog))
  } catch (exception) {
    response.status(400).json({ error: 'malformatted id' })
  }
})

module.exports = blogsRouter