import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
//import blogService from './services/blogs'
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

const App = (props) => {
    const [blogFormVisible, setBlogFormVisible] = useState(false)
    const username = useField('text')
    const password = useField('password')

    console.log('PROPS ', props)

    /* useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }

    }, []) */

    const initBlogs = props.initializeBlogs
    const initUsers = props.initializeUsers

    useEffect(() => {
        initBlogs()
        initUsers()
    }, [initBlogs, initUsers])

    /*    useEffect(() => {
           
       }, []) */



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
            props.setNotification(`wrong username or password`, 'error')
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
                    <button onClick={() => setBlogFormVisible(true)}>new blog</button>
                </div>
                <div style={showWhenVisible} >
                    <h2> create new</h2>
                    <BlogForm />

                    <button onClick={() => setBlogFormVisible(false)}>cancel</button>
                </div>
            </div >
        )
    }

    const userById = (id) => {
        if (props.users[0] === undefined) {
            return null
        }
        return props.users[0].find(user => user.id === id)
    }

    const blogById = (id) => {
        if (props.blogs[0] === undefined) {
            return null
        }
        return props.blogs[0].find(blog => blog.id === id)
    }

    return (
        <div>
            {props.loggedUser ?
                <div>
                    <Router>
                        <div className='blogsList'>
                            <Menu logout={logout}/>
                            <h2>blogs</h2>
                            <Notification />
                            <br />
                           
                            
                            <Route exact path='/' render={() => <Blogs blogForm={blogForm}/>} />
                            <Route exact path='/users' render={() => <Users />} />
                            <Route exact path='/users/:id' render={({ match }) => <User user={userById(match.params.id)} />} />
                            <Route exact path='/blogs/:id' render={({ match }) => <Blog blog={blogById(match.params.id)} />} />
                        </div>
                    </Router>
                </div>

                :

                <div className='loginForm'>
                    <h2>Login</h2>
                    <Notification />
                    <br />
                    <LoginForm handleLogin={handleLogin}
                        username={username} password={password} />
                </div>
            }
        </div>
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
