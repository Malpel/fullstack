import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
    let component

    const testBlogs = [{
        title: 'tester\'s blog',
        author: 'Malpel',
        likes: 21,
        user: 'Malpel'
    }]

    const mockHandler = jest.fn()

    beforeEach(() => {
        component = render(
            <Blog blog={testBlogs[0]} blogs={testBlogs}
                setBlogs={mockHandler} user='Malpel' />
        )
    })

    test('by default: renders only title and author ', () => {
        component.container.querySelector('.compactBlog')
    })

    test('clicking on title reveals more information', () => {
        const clickablePart = component.container.querySelector('.title')
        fireEvent.click(clickablePart)
        const fullBlog = component.container.querySelector('.fullBlog')
        console.log(prettyDOM(fullBlog))
        component.container.querySelector('.fullBlog')
    })
})