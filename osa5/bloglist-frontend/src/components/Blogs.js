import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

const Blogs = ({ blogs, setBlogs, user }) => {
    if (blogs) {
        return (
            <div>
                {blogs.map(blog => <Blog key={blog.title}
                    blog={blog} blogs={blogs} setBlogs={setBlogs} user={user} />)}
            </div>
        )
    }
    return <div>
        nothing
    </div>
}

Blogs.propTypes = {
    blogs: PropTypes.array,
    setBlogs: PropTypes.func.isRequired,
    user: PropTypes.string.isRequired
}

export default Blogs