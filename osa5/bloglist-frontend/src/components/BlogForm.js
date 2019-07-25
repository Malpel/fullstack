import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const BlogForm = ({ setBlogs, blogs, setNotification, notify }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()
        try {
            const blogObject = {
                title: newTitle,
                author: newAuthor,
                url: newUrl
            }

            const savedBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat(savedBlog))
            setNotification({
                type: 'success',
                message: `a new blog ${savedBlog.title} by ${savedBlog.author} added`
            })
            setNewTitle('')
            setNewAuthor('')
            setNewUrl('')
            notify()
        }
        catch (exception) {
            console.log(exception)
        }
    }

    return (
        <div>
            <form onSubmit={addBlog}>
                <div>
                    title: <input type='text' name='newTitle'
                        value={newTitle} onChange={({ target }) => setNewTitle(target.value)} />
                </div>
                <div>
                    author: <input type='text' name='newAuthor'
                        value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} />
                </div>
                <div>
                    url: <input type='text' name='newUrl'
                        value={newUrl} onChange={({ target }) => setNewUrl(target.value)} />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    setBlogs: PropTypes.func.isRequired,
    blogs: PropTypes.array,
    setNotification: PropTypes.func.isRequired,
    notify: PropTypes.func.isRequired
}

export default BlogForm