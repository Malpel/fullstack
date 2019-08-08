import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
    let component

    const testBlog = {
        title: 'tester\'s blog',
        author: 'Malpel',
        likes: 21
    }

    const mockHandler = jest.fn()

    beforeEach(() => {
        component = render(
            <SimpleBlog blog={testBlog} onClick={mockHandler} />
        )
    })

    test('renders title and author', () => {
        component.container.querySelector('.titleDiv')
    })

    test('renders likes', () => {
        component.container.querySelector('.likeDiv')
    })

    test('event handler is called when like button is clicked', () => {
        const button = component.getByText('like')
        fireEvent.click(button)
        fireEvent.click(button)
        expect(mockHandler.mock.calls.length).toBe(2)
    })
})