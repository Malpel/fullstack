import React, { useState } from 'react'
import { connect } from 'react-redux'
import { removeBlog, likeBlog } from '../reducers/blogReducer'
import commentService from '../services/comments'
import { useField } from '../hooks/index'
import { Comment, Header, TextArea, Button, Segment, Statistic } from 'semantic-ui-react'


const Blog = (props) => {
    console.log('BLOG', props.blog)

    const [comments, setComments] = useState(null)
    const comment = useField('text')

    if (!props.blog) {
        return null
    } else if (!comments && props.blog) {
        setComments(props.blog.comments)
        return null
    }

    const likeBlog = async (blog) => {
        try {
            console.log('BLOGVIEW', blog)
            await props.likeBlog(blog)
        }
        catch (exception) {
            console.log(exception)
        }

    }

    const removeButton = () => {
        const hide = { display: props.loggedUser.username !== props.blog.user.username ? 'none' : '' }
        const show = { display: props.loggedUser.username === props.blog.user.username ? '' : 'none' }

        return (
            <div>
                <div style={hide}>
                </div>
                <div style={show} >
                    <Button negative onClick={() => removeBlog(props.blog)}>Remove blog</Button>
                </div>
            </div >
        )
    }

    const removeBlog = async (blog) => {
        if (window.confirm(`delete blog "${blog.title}" by ${blog.author}`)) {
            props.removeBlog(blog.id)
        } else {
            console.log('cancelled')
        }
    }

    const addComment = async (event) => {
        event.preventDefault()
        const addedComment = await commentService.saveComment(props.blog.id,
            comment.value,
            props.loggedUser.token)
        setComments([...comments, addedComment])
        comment.reset.resetValue()
    }

    return (
        <div>
            <Segment vertical>
                <h2>&quot;{props.blog.title}&quot; by {props.blog.author}</h2>
                <h3><a href={props.blog.url}>{props.blog.url}</a></h3>
                <Segment compact>
                    <Statistic size='tiny'>
                        <Statistic.Value data-cy='blogLikes'>
                            {props.blog.likes}
                        </Statistic.Value>
                        <Statistic.Label>
                            likes
                        </Statistic.Label>
                    </Statistic>
                </Segment>

                <Button color='pink'
                    onClick={() => likeBlog(props.blog)}
                    data-cy='likeButton'>Like</Button>
                <br />
                <h4>Added by {props.blog.user.username}</h4>
                <br />
                {removeButton()}
            </Segment>

            <Segment vertical>
                <Header as='h3'>Comments</Header>
                <form onSubmit={addComment}>
                    <TextArea required placeholder='Leave a comment...' style={{ minHeight: 100 }} {...comment} />
                    <br />
                    <Button primary type='submit'>Add comment</Button>
                </form>
                <Comment.Group>
                    {comments.map(
                        comment => <Comment key={comment.content}>
                            <Comment.Content>
                                <Comment.Author>
                                    Anonymous
                                </Comment.Author>
                                <Comment.Metadata>
                                    {comment.id}
                                </Comment.Metadata>
                                <Comment.Text>
                                    {comment.content}
                                </Comment.Text>
                            </Comment.Content>
                        </Comment>)}
                </Comment.Group>
            </Segment>

        </div>
    )
}
// REDIRECT TO FRONTPAGE IF JUST DELETED BLOG

/* Blog.propTypes = {
                blog: PropTypes.object.isRequired,
            user: PropTypes.string.isRequired
        } */

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        loggedUser: state.loggedUser,
        likeBlog
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