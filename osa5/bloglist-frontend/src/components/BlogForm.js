import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { useField } from '../hooks/index'

const BlogForm = ({ setBlogs, blogs, setNotification, notify }) => {
    const title = useField('text')
    const author = useField('text')
    const url = useField('text')

    const addBlog = async (event) => {
        event.preventDefault()
        try {
            const blogObject = {
                title: title.value,
                author: author.value,
                url: url.value
            }

            const savedBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat(savedBlog))
            setNotification({
                type: 'success',
                message: `a new blog ${savedBlog.title} by ${savedBlog.author} added`
            })
            title.reset.resetValue()
            author.reset.resetValue()
            url.reset.resetValue()
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
                    title: <input {...title} />
                </div>
                <div>
                    author: <input {...author} />
                </div>
                <div>
                    url: <input {...url} />
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