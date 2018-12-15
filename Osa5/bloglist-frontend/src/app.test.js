import React from 'react'
import { mount } from 'enzyme'
import { App, LoginForm } from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })

  it('renders only login form when not logged in', () => {
    app.update()
    const loginComponent = app.find(LoginForm)
    const blogComponent = app.find(Blog)
    expect(app.find(LoginForm).exists()).toEqual(true)
    expect(app.find(Blog).exists()).toEqual(false)
  })
})