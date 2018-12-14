import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ error }) => {
  if (error === null) {
    return null
  }
  return (
    <div>
      {error}
    </div>
  )
}

const BlogForm = ({ addBlog, onChange, title, author, url }) => (
  <form onSubmit={addBlog}>
    <div>
      Title:
      <input
        type="text"
        name="title"
        value={title}
        onChange={onChange}
      />
    </div>
    <div>
      Author:
      <input
        type="text"
        name="author"
        value={author}
        onChange={onChange}
      />
    </div>
    <div>
      Url:
      <input
        type="text"
        name="url"
        value={url}
        onChange={onChange}
      />
    </div>
    <button type="submit">create</button>
  </form>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: '',
      password: '',
      error: null,
      title: '',
      author: '',
      url: ''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      console.log(user.token)
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch(exception) {
      this.setState({
        error: 'username or password not correct',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = () => {
    window.localStorage.removeItem('loggedUser')
    this.setState({ user: null })
  }

  addBlog = async (event) => {
    event.preventDefault()
    try {
      const { author, title, url } = this.state
      const blog = {
        author: author,
        title: title,
        url: url
      }
      const newBlog = await blogService.create(blog)
      this.setState({
        blogs: this.state.blogs.concat(newBlog),
        error: `a new blog ${title} by ${author} added` })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
      this.setState({ author: '', title: '', url: '' })
    } catch (e) {
      this.setState({ error: 'failed to add new blog' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  render() {
    const { blogs, user, title, author, url, error } = this.state
    const loginForm = () => (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={this.login}>
          <div>
            username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleFieldChange}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )

    return (
      <div>
        <Notification error={error} />
        { user === null ?
          loginForm()
          :
          <div>
            <h2>Blogs</h2>
            <p>{user.name} logged in <button onClick={this.logout}>logout</button></p>
            <h2>Create new</h2>
            <BlogForm
              addBlog={this.addBlog}
              onChange={this.handleFieldChange}
              title={title}
              author={author}
              url={url}
            />
            <h2>Blog list</h2>
            {blogs.map(blog =>
              <Blog key={blog._id} blog={blog}/>
            )}
          </div>
        }
      </div>
    )
  }
}

export default App;
