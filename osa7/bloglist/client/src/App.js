import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { useField } from './hooks/index'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { login, setUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'
import { Container, Button, Header } from 'semantic-ui-react'
import blogService from './services/blogs'

const App = (props) => {
    const [blogFormVisible, setBlogFormVisible] = useState(false)
    const username = useField('text')
    const password = useField('password')

    console.log('PROPS ', props)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }

    }, [])

    const initBlogs = props.initializeBlogs
    const initUsers = props.initializeUsers

    useEffect(() => {
        initBlogs()
        initUsers()
    }, [initBlogs, initUsers])


    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            await props.login({
                username: username.value,
                password: password.value
            })

            username.reset.resetValue()
            password.reset.resetValue()
        }

        catch (exception) {
            console.log(exception)
            props.setNotification('wrong username or password', 'error')
            password.reset.resetValue()
        }
    }

    const logout = () => {
        window.localStorage.clear()
        window.location.reload()
    }

    const blogForm = () => {
        const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
        const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

        return (
            <div>
                <div style={hideWhenVisible}>
                    <Button primary
                        onClick={() => setBlogFormVisible(true)}
                        data-cy='newBlog'>New Blog</Button>
                </div>
                <div style={showWhenVisible} >
                    <BlogForm />
                    <Button onClick={() => setBlogFormVisible(false)}>Cancel</Button>
                </div>
            </div >
        )
    }

    const userById = (id) => {
        if (props.users === undefined) {
            return null
        }
        return props.users.find(user => user.id === id)
    }

    const blogById = (id) => {
        if (props.blogs === undefined) {
            return null
        }
        return props.blogs.find(blog => blog.id === id)
    }

    return (
        <Container>
            {props.loggedUser ?
                <div>
                    <Router>
                        <div className='blogsList'>
                            <Menu logout={logout} />

                            <Notification />
                            <Route exact path='/' render={() => <Blogs blogForm={blogForm} />} />
                            <Route exact path='/users' render={() => <Users />} />
                            <Route exact path='/users/:id' render={({ match }) => <User user={userById(match.params.id)} />} />
                            <Route exact path='/blogs/:id' render={({ match }) => <Blog blog={blogById(match.params.id)} />} />

                            <br />

                        </div>
                    </Router>
                </div>

                :

                <div className='loginForm'>
                    <br />
                    <Header as='h2'>Login</Header>
                    <Notification />
                    <br />
                    <LoginForm handleLogin={handleLogin}
                        username={username} password={password} />
                </div>


            }
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        loggedUser: state.loggedUser,
        users: state.users,
        blogs: state.blogs
    }
}

const mapDispatchToProps = {
    setNotification,
    initializeBlogs,
    login,
    setUser,
    initializeUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
