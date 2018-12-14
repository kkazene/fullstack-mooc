import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: '',
      password: '',
      error: ''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

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

  render() {
    const { blogs, user } = this.state
    return (
      <div>
        { user === null ?
          <div>
            <h2>Log in to application</h2>
            <form onSubmit={this.login}>
              <div>
                username:
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleLoginFieldChange}
                />
              </div>
              <div>
                password:
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleLoginFieldChange}
                />
              </div>
              <button type="submit">login</button>
            </form>
          </div>
          :
          <div>
            <h2>blogs</h2>
            <p>{user.name} logged in</p>
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
