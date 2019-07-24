import React from 'react'
import Blog from './Blog'

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

export default Blogs