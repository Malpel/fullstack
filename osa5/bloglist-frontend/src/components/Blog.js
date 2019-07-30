import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogs, setBlogs, user }) => {
    const [allVisible, setAllVisible] = useState(false)
    const [likes, setLikes] = useState(blog.likes)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const likeBlog = async (blog) => {
        try {
            const blogObject = {
                title: blog.title,
                author: blog.author,
                url: blog.url,
                likes: (likes + 1),
                user: blog.user
            }
            const res = await blogService.update(blog.id, blogObject)
            setLikes(likes + 1)
            return res
        }
        catch (exception) {
            console.log(exception)
        }

    }
    const deleteButton = () => {
        const hide = { display: user !== blog.user.username ? 'none' : '' }
        const show = { display: user === blog.user.username ? '' : 'none' }

        return (
            <div>
                <div style={hide}>
                </div>
                <div style={show} >
                    <button onClick={() => deleteBlog(blog)}>delete</button>
                </div>
            </div >
        )
    }

    const deleteBlog = async (blog) => {
        if (window.confirm(`delete blog "${blog.title}" by ${blog.author}`)) {
            await blogService.remove(blog.id)
            const filteredBlogs = blogs.filter(b => b.id !== blog.id)
            setBlogs(filteredBlogs)
        } else {
            console.log('cancelled')
        }
    }

    return (
        <div style={blogStyle}>
            {allVisible ?
                <div className='fullBlog' >
                    <p onClick={() => setAllVisible(false)}>{blog.title} {blog.author}</p>
                    <br />
                    <a href={blog.url}>{blog.url}</a>
                    <br />
                    {likes} likes  <button onClick={() => likeBlog(blog)}>like</button>
                    <br />
                    added by {blog.user.username}
                    <br />
                    {deleteButton()}
                </div>
                :
                <div className='compactBlog'>
                    <p className='title' onClick={() => setAllVisible(true)}>{blog.title} {blog.author}</p>
                </div>}
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    blogs: PropTypes.array.isRequired,
    setBlogs: PropTypes.func.isRequired,
    user: PropTypes.string.isRequired
}

export default Blog