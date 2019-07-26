import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
    test('if no user logged, blogs are not rendered', async () => {
        const component = render(<App />)
        component.rerender(<App />)

        await waitForElement(() => component.container.querySelector('.loginForm'))

        expect(component.container).not.toHaveTextContent(
            'blogs'
        )
        expect(component.container).toHaveTextContent(
            'username'
        )
    })

    test('if user logged, blogs are rendered', async () => {
        const user = {
            username: 'tester',
            token: '1231231214',
            name: 'Donald Tester'
        }

        localStorage.setItem('loggedBlogListUser', JSON.stringify(user))
        console.log(localStorage.getItem('loggedBlogListUser'))

        const component = render(<App />)

        await waitForElement(() => component.container.querySelector('.blogsList'))
        component.debug()

        expect(component.container.querySelector('.blogsList')).toHaveTextContent('blogs')

    })
})