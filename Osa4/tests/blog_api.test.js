const supertest = require('supertest')
const { app, server } = require('../index')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)

describe('API tests', () => {
  beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const blogsInDatabase = await helper.blogsInDb()
    const response = await api
      .get('/api/blogs')

    expect(response.body.length).toBe(blogsInDatabase.length)
  })

  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'A Tale of Dudes',
      author: 'Dude McDudeface',
      url: 'http://dude.face.com/yes/itsveryreal.html',
      likes: 0
    }
    const blogsBeforeOperation = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterOperation = await helper.blogsInDb()

    const titles = blogsAfterOperation.map(r => r.title)

    expect(blogsAfterOperation.length).toBe(blogsBeforeOperation.length + 1)
    expect(titles).toContain('A Tale of Dudes')
  })

  test('a blog can be added without likes', async () => {
    const newBlog = {
      title: 'Another Tale of Dudes',
      author: 'Duder McDuderface',
      url: 'http://duder.face.com/yes/itsveryreal.html'
    }

    const blogsBeforeOperation = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterOperation = await helper.blogsInDb()

    const latestLikes = blogsAfterOperation[blogsAfterOperation.length-1].likes

    expect(blogsAfterOperation.length).toBe(blogsBeforeOperation.length + 1)
    expect(latestLikes).toBe(0)
  })

  test('a blog can\'t be added without title and url', async () => {
    const newBlog = {
      author: 'Somedude WithnoTitle'
    }
    const blogsBeforeOperation = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAfterOperation = await helper.blogsInDb()

    const authors = blogsAfterOperation.map(r => r.author)

    expect(blogsAfterOperation.length).toBe(blogsBeforeOperation.length)
    expect(authors).not.toContain('Somedude WithnoTitle')
  })

})
describe('note deletion', async() => {
  let addedBlog

  beforeEach(async () => {
    addedBlog = new Blog({
      author: 'Jaba jababa',
      title: 'Sometitle',
      url: 'http://some.thing/yes'
    })
    await addedBlog.save()
  })

  test('a blog can be deleted', async () => {
    const blogsBeforeOperation = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${addedBlog._id}`)
      .expect(204)

    const blogsAfterOperation = await helper.blogsInDb()

    const titles = blogsAfterOperation.map(r => r.title)

    expect(titles).not.toContain(addedBlog.title)
    expect(blogsAfterOperation.length).toBe(blogsBeforeOperation.length - 1)
  })

  test('a blog with malformatted id can\'t be deleted', async () => {
    const blogsBeforeOperation = await helper.blogsInDb()

    await api
      .delete('/api/blogs/somebogusid')
      .expect(400)

    const blogsAfterOperation = await helper.blogsInDb()

    const titles = blogsAfterOperation.map(r => r.title)

    expect(titles).toContain(addedBlog.title)
    expect(blogsAfterOperation.length).toBe(blogsBeforeOperation.length)
  })
})

describe('note updates', async() => {
  let addedBlog

  beforeAll(async () => {
    addedBlog = new Blog({
      author: 'Jaba jababa',
      title: 'Sometitle',
      url: 'http://some.thing/yes'
    })
    await addedBlog.save()
  })

  test('a blog can be updated', async () => {
    const updatedBlog = {
      _id: addedBlog._id,
      likes: 2000
    }
    const blogsBeforeOperation = await helper.blogsInDb()

    await api
      .put(`/api/blogs/${updatedBlog._id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAfterOperation = await helper.blogsInDb()

    const likes = blogsAfterOperation.map(r => r.likes)

    expect(likes).toContain(addedBlog.likes)
    expect(blogsAfterOperation.length).toBe(blogsBeforeOperation.length)
  })

  test('a blog with malformatted id can\'t be updated', async () => {
    const updatedBlog = {
      likes: 4000
    }
    const blogsBeforeOperation = await helper.blogsInDb()

    await api
      .put('/api/blogs/notreallyanid')
      .send(updatedBlog)
      .expect(400)

    const blogsAfterOperation = await helper.blogsInDb()

    const likes = blogsAfterOperation.map(r => r.likes)

    expect(likes).not.toContain(updatedBlog.likes)
    expect(blogsAfterOperation.length).toBe(blogsBeforeOperation.length)
  })
})
describe('when there is initially one user at db', async () => {
  beforeAll(async () => {
    await User.remove({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  test('POST /api/users succeeds with a fresh username', async () => {
    const usersBeforeOperation = await helper.usersInDb()

    const newUser = {
      username: 'joku',
      name: 'Joku Nimi',
      password: 'salakala'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await helper.usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
    const usernames = usersAfterOperation.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('POST /api/users fails with an already in use username', async () => {
    const usersBeforeOperation = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Aivan Uusi Nimi',
      password: 'salakala'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAfterOperation = await helper.usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
    const names = usersAfterOperation.map(u => u.name)
    expect(names).not.toContain(newUser.name)
  })

  test('POST /api/users fails with a password of less than 3 chars', async () => {
    const usersBeforeOperation = await helper.usersInDb()

    const newUser = {
      username: 'uusijee',
      name: 'Aivan Uusi Nimi',
      password: 'mo'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAfterOperation = await helper.usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
    const usernames = usersAfterOperation.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)
  })

  test('POST /api/users adds adult true if not specified', async () => {
    const usersBeforeOperation = await helper.usersInDb()

    const newUser = {
      username: 'uuusijee',
      name: 'Aivan Uusi Nimi',
      password: 'moii'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await helper.usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
    const lastAdult = usersAfterOperation[usersAfterOperation.length-1].adult
    expect(lastAdult).toBe(true)
  })
})

afterAll(() => {
  server.close()
})