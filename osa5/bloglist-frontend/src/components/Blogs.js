import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs }) => {
    if (blogs) {
        return (
            <div>
                {blogs.map(blog => <Blog key={blog.title} blog={blog} />)}
            </div>
        )
    }
    return <div>
        nothing
    </div>

}

export default Blogs