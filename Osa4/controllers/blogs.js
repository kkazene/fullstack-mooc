const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs.map(Blog.format))
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

    response.status(201).json(Blog.format(savedBlog))
  } catch (exception) {
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