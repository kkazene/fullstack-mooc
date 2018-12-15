import React from 'react'
import { shallow } from 'enzyme'
import { Blog, SimpleBlog } from './Blog'

describe.only('Render blog component', () => {
  it('renders content', () => {
    const blogs = [{
      _id: 555,
      title: 'Yes it\'s a title',
      author: 'Itsa Me Mario',
      likes: 5
    }]
    const mockHandler = jest.fn()

    const blogComponent = shallow(
      <Blog
        blogs={blogs}
        detailedBlog={null}
        toggleDetails={mockHandler}
        user={null}
      />)
    console.log(blogComponent.debug())
    const contentDiv = blogComponent.find(SimpleBlog)
    console.log(contentDiv.debug())
    // const likesDiv = blogComponent.find('.likes')

    // expect(contentDiv.text()).toContain(blog.title)
    // expect(contentDiv.text()).toContain(blog.author)
    // expect(likesDiv.text()).toContain(blog.likes)
  })
})