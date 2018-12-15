import React from 'react'
import { mount } from 'enzyme'
import { App, LoginForm } from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => { 
  let app
  describe('when user is not logged in', () => {
    beforeEach(() => {
      app = mount(<App />)
    })
    it('renders only login form when not logged in', () => {
      app.update()
      expect(app.find(LoginForm).exists()).toEqual(true)
      expect(app.find(Blog).exists()).toEqual(false)
    })
  }),

  describe.only('when user is logged in', () => {
    let app
    beforeEach(() => {
      const user = {
        username: 'moi',
        token: '1231231214',
        name: 'klaus'
      }    
      console.log(localStorage)
      localStorage.setItem('loggedUser', JSON.stringify(user))
      app = mount(<App />)
    })
    it('renders blog list if logged in', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })
})