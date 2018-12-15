import React from 'react'
import { mount } from 'enzyme'
import { Blog, SimpleBlog, DetailedBlog } from './Blog'

describe.only('Render blog component', () => {
  it('renders content', () => {
    const blogs = [{
      _id: 555,
      title: 'Yes it\'s a title',
      author: 'Itsa Me Mario',
      likes: 5
    }]
    const mockHandler = jest.fn()

    const blogComponent = mount(
      <Blog
        blogs={blogs}
        detailedBlog={null}
        toggleDetails={mockHandler}
        user={null}
      />)
    console.log(blogComponent.debug())
    const contentDiv = blogComponent.find(SimpleBlog)
    const clickableDiv = contentDiv.find('div')
    console.log(clickableDiv.debug())
    console.log(blogComponent.debug())
    // tests are not going through since the real function isn't simulated.
    const detailedDiv = blogComponent.find(DetailedBlog)
    console.log(detailedDiv.debug())
  })
})