import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { removeBlog, likeBlog } from '../reducers/blogReducer'

const Blog = (props) => {
    const [allVisible, setAllVisible] = useState(false)
    const [likes, setLikes] = useState(props.blog.likes)

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
            const res = props.likeBlog(blog.id, blogObject)
            setLikes(likes + 1)
            return res
        }
        catch (exception) {
            console.log(exception)
        }

    }
    const deleteButton = () => {
        const hide = { display: props.user !== props.blog.user.username ? 'none' : '' }
        const show = { display: props.user === props.blog.user.username ? '' : 'none' }

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
        <div style={blogStyle}>
            {allVisible ?
                <div className='fullBlog' >
                    <p onClick={() => setAllVisible(false)}>{props.blog.title} {props.blog.author}</p>
                    <br />
                    <a href={props.blog.url}>{props.blog.url}</a>
                    <br />
                    {likes} likes  <button onClick={() => likeBlog(props.blog)}>like</button>
                    <br />
                    added by {props.blog.user.username}
                    <br />
                    {deleteButton()}
                </div>
                :
                <div className='compactBlog'>
                    <p className='title' onClick={() => setAllVisible(true)}>{props.blog.title} {props.blog.author}</p>
                </div>}
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
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