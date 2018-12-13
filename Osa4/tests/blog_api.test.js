const supertest = require('supertest')
const { app, server } = require('../index')
const Blog = require('../models/blog')
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

  afterAll(() => {
    server.close()
  })
})
