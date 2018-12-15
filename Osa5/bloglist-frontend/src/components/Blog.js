import React from 'react'
import PropTypes from 'prop-types'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
const SimpleBlog = ({ blog, toggleDetails }) => (
  <div style={blogStyle} onClick={() => toggleDetails(blog)}>
    {blog.title} {blog.author}
  </div>
)

const DetailedBlog = ({ blog, user, toggleDetails, likeBlog, deleteBlog }) => (
  <div style={blogStyle}>
    <p onClick={() => toggleDetails(blog)}>{blog.title}: {blog.author}</p>
    <p>{blog.likes} likes <button onClick={() => likeBlog(blog)} >like</button></p>
    {blog.user && <p>added by {blog.user.name}</p>}
    {blog.user.username === user.username && <button name="delete"onClick={() => deleteBlog(blog)} >delete</button>}
  </div>
)

class Blog extends React.Component {

  render() {
    const { blogs, detailedBlog, toggleDetails, likeBlog, deleteBlog, user } = this.props
    blogs.sort((a, b) => b.likes - a.likes)
    return (
      <div>
        {blogs.map((blog) => (
          blog._id === detailedBlog ?
            <DetailedBlog
              key={blog._id}
              blog={blog}
              user={user}
              toggleDetails={toggleDetails}
              likeBlog={likeBlog}
              deleteBlog={deleteBlog} />
            :
            <SimpleBlog
              key={blog._id}
              blog={blog}
              detailedBlog={detailedBlog}
              toggleDetails={toggleDetails} />
        ))}
      </div>
    )
  }
}

Blog.propTypes = {
  blogs: PropTypes.array,
  detailedBlog: PropTypes.string,
  toggleDetails: PropTypes.func,
  likeBlog: PropTypes.func,
  deleteBlog: PropTypes.func,
  user: PropTypes.object
}

DetailedBlog.propTypes = {
  blog: PropTypes.object,
  toggleDetails: PropTypes.func,
  likeBlog: PropTypes.func,
  deleteBlog: PropTypes.func,
  user: PropTypes.object
}

SimpleBlog.propTypes = {
  blog: PropTypes.object,
  toggleDetails: PropTypes.func
}

module.exports = { Blog, DetailedBlog, SimpleBlog }