const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({})
    response.json(users.map(User.format))
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong' })
  }
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    const existingUser = await User.find({ username: body.username })

    if (existingUser.length > 0)
      return response.status(400).json({ error: 'username must be unique' })

    if (body.password.length < 3)
      return response.status(400).json({ error: 'password must be at least 3 chars long' })

    if (body.adult === undefined)
      body.adult = true

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      adult: body.adult,
      passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(User.format(savedUser))
  } catch (exception) {
    response.status(500).json({ error: 'something went wrong' })
  }
})

// usersRouter.delete('/:id', async (request, response) => {
//   try {
//     await Blog.findByIdAndRemove(request.params.id)
//     response.status(204).end()
//   } catch (exception) {
//     response.status(400).json({ error: 'malformatted id' })
//   }
// })

// usersRouter.put('/:id', async (request, response) => {
//   try {
//     const blog = await Blog.findById(request.params.id)
//     if (blog)
//       blog.likes = request.params.likes

//     const savedBlog = await blog.save()
//     response.status(200).json(savedBlog)
//   } catch (exception) {
//     response.status(400).json({ error: 'malformatted id' })
//   }
// })

module.exports = usersRouter