import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useField } from '../hooks/index'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = (props) => {
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

            props.createBlog(blogObject)
            props.setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`)
            title.reset.resetValue()
            author.reset.resetValue()
            url.reset.resetValue()
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
    blogs: PropTypes.array,
    setNotification: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}

const mapDispatchToProps = {
    setNotification,
    createBlog
}

const ConnecteBlogForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogForm)

export default ConnecteBlogForm