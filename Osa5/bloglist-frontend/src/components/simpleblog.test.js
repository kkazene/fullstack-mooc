import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './Simpleblog'

describe.only('Render simpleblog', () => {
  it('renders content', () => {
    const blog = {
      title: 'Yes it\'s a title',
      author: 'Itsa Me Mario',
      likes: 5
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const contentDiv = blogComponent.find('.content')
    const likesDiv = blogComponent.find('.likes')

    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)
    expect(likesDiv.text()).toContain(blog.likes)
  })
})