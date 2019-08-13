import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useField } from '../hooks/index'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { Form, Button, Segment } from 'semantic-ui-react'

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
        <Segment>
            <h3>Add a new blog</h3>
            <Form onSubmit={addBlog}>
                <Form.Field>
                    <label>Title: </label>
                    <input {...title} required />
                </Form.Field>
                <Form.Field>
                    <label>Author: </label>
                    <input {...author} required />
                </Form.Field>
                <Form.Field>
                    <label>URL: </label>
                    <input {...url} required />
                </Form.Field>
                <Button positive type='submit'>Create</Button>
            </Form>
            <br />
        </Segment>
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