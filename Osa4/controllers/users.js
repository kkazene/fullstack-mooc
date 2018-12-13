const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({})
    response.json(users)
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong' })
  }
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      adult: body.adult,
      passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
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