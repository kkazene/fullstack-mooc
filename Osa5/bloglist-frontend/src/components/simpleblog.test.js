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
  }),
  it('calls function twice when button is clicked twice', () => {
    const blog = {
      title: 'Yes it\'s a title',
      author: 'Itsa Me Mario',
      likes: 5
    }
    const mockHandler = jest.fn()
    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
    
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})