import React from 'react'

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

const DetailedBlog = ({ blog, toggleDetails }) => (
  <div style={blogStyle} onClick={() => toggleDetails(blog)}>
    <p>{blog.title}: {blog.author}</p>
    <p>{blog.likes} likes <button>like</button></p>
    {blog.user && <p>added by {blog.user.name}</p>}
  </div>
)

class Blog extends React.Component {

  render() {
    const { blogs, detailedBlog, toggleDetails } = this.props
    return (
      <div>
        {blogs.map((blog) => (
          blog._id === detailedBlog ?
            <DetailedBlog
              key={blog._id}
              blog={blog}
              toggleDetails={toggleDetails} />
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

export default Blog