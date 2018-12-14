import React from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
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

const LoginForm = ({ login, username, password, onChange }) => (
  <div>
    <h2>Log in to application</h2>
    <form onSubmit={login}>
      <div>
        username:
        <input
          type="text"
          name="username"
          value={username}
          onChange={onChange}
        />
      </div>
      <div>
        password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)

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
      detailedBlog: null,
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
    this.blogForm.toggleVisibility()
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

  likeBlog = async (blog) => {
    try {
      const newBlog = ({
        _id: blog._id,
        author: blog.author,
        title: blog.title,
        url: blog.url,
        user: blog.user,
        likes: (blog.likes) + 1
      })
      const updatedBlog = await blogService.update(newBlog._id, newBlog)
      const blogs = this.state.blogs.filter(n => n._id !== newBlog._id)
      this.setState({
        blogs: blogs.concat(updatedBlog),
        error: `Liked blog ${newBlog.title}!`
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    } catch (e) {
      this.setState({
        error: 'Something went wrong!'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }
  deleteBlog = async (blog) => {
    const result = window.confirm(`delete '${blog.title}' by ${blog.author}?`);
    if (result) {
      try {
        const id = blog._id
        await blogService.remove(id)
        const blogs = this.state.blogs.filter(n => n._id !== id)
        this.setState({
          blogs,
          error: `Removed blog ${blog.title}!`
        })
        setTimeout(() => {
          this.setState({ error: null })
        }, 5000)
      } catch (e) {
        this.setState({
          error: 'Something went wrong!'
        })
        setTimeout(() => {
          this.setState({ error: null })
        }, 5000)
      }
    }
  }

  toggleDetails = (blog) => {
    if (this.state.detailedBlog === blog._id) {
      this.setState({ detailedBlog: null })
    } else
      this.setState({ detailedBlog: blog._id })
  }

  render() {
    const {
      username,
      password,
      blogs,
      detailedBlog,
      user,
      title,
      author,
      url,
      error
    } = this.state

    return (
      <div>
        <Notification error={error} />
        { user === null ?
          <LoginForm
            login={this.login}
            username={username}
            password={password}
            onChange={this.handleFieldChange} />
          :
          <div>
            <h2>Blogs</h2>
            <p>{user.name} logged in <button onClick={this.logout}>logout</button></p>
            <h2>Create new</h2>
            <Togglable buttonLabel="Add blog" ref={component => this.blogForm = component}>
              <BlogForm
                addBlog={this.addBlog}
                onChange={this.handleFieldChange}
                title={title}
                author={author}
                url={url}
              />
            </Togglable>
            <h2>Blog list</h2>
            <Blog
              blogs={blogs}
              detailedBlog={detailedBlog}
              toggleDetails={this.toggleDetails}
              likeBlog={this.likeBlog}
              deleteBlog={this.deleteBlog}
            />
          </div>
        }
      </div>
    )
  }
}

export default App;
