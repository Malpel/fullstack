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

const App = (props) => {
    const [blogFormVisible, setBlogFormVisible] = useState(false)
    const username = useField('text')
    const password = useField('password')

    console.log('PROPS ', props.users)

    /* useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }

    }, []) */

    const initBlogs =  props.initializeBlogs
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

    return (
        <div>
            {props.loggedUser ?
                <div>
                    <Router>
                        <div className='blogsList'>
                            <h2>blogs</h2>
                            <Link to='/users'>users</Link>
                            <Notification />
                            <br />
                            {props.loggedUser.name} logged in <button onClick={logout}>logout</button>
                            <br />
                            <br />
                            {blogForm()}
                            <br />
                            <Route exact path='/' render={() => <Blogs />} />
                            <Route path='/users' render={() => <Users />} />
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
        users: state.users
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
