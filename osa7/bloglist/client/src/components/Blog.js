import React, { useState } from 'react'
import { connect } from 'react-redux'
import { removeBlog, likeBlog } from '../reducers/blogReducer'

const Blog = (props) => {
    console.log('BLOG', props.blog)

    const [blog, setBlog] = useState(props.blog)

    if (!blog && !props.blog) {
        return null
    } else if (!blog && props.blog) {
        setBlog(props.blog)
        return null
    }
    
    const likeBlog = async (blog) => {
        try {
            const blogObject = {
                id: blog.id,
                title: blog.title,
                author: blog.author,
                url: blog.url,
                likes: (blog.likes + 1),
                user: blog.user
            }
            await props.likeBlog(blog.id, blogObject)
            setBlog(blogObject)
        }
        catch (exception) {
            console.log(exception)
        }

    }

    const deleteButton = () => {
        const hide = { display: props.loggedUser.username !== props.blog.user.username ? 'none' : '' }
        const show = { display: props.loggedUser.username === props.blog.user.username ? '' : 'none' }

        return (
            <div>
                <div style={hide}>
                </div>
                <div style={show} >
                    <button onClick={() => deleteBlog(props.blog)}>delete</button>
                </div>
            </div >
        )
    }

    const deleteBlog = async (blog) => {
        if (window.confirm(`delete blog "${blog.title}" by ${blog.author}`)) {
            props.removeBlog(blog.id)
        } else {
            console.log('cancelled')
        }
    }

    return (
        <div>
            <h2>{blog.title} {blog.author}</h2>
            <a href={blog.url}>{blog.url}</a>
            <br />
            {blog.likes} likes  <button onClick={() => likeBlog(blog)}>like</button>
            <br />
            added by {blog.user.username}
            <br />
            {deleteButton()}
        </div>
    )
}

/* Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.string.isRequired
} */

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        loggedUser: state.loggedUser
    }
}

const mapDispatchToProps = {
    removeBlog,
    likeBlog
}

const ConnectedBlog = connect(
    mapStateToProps,
    mapDispatchToProps
)(Blog)

export default ConnectedBlog