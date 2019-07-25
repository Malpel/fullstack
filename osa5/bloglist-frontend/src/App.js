import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

function App() {
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [notification, setNotification] = useState(null)
    const [blogFormVisible, setBlogFormVisible] = useState(false)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }

    }, [])

    useEffect(() => {
        const getBlogs = async () => {
            const allBlogs = await blogService.getAll()
            const sortedBlogs = allBlogs.sort((a, b) => b.likes - a.likes)
            setBlogs(sortedBlogs)
        }
        getBlogs()
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })

            window.localStorage.setItem(
                'loggedBloglistUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        }

        catch (exception) {
            console.log(exception)
            setNotification(
                {
                    type: 'error',
                    message: 'wrong username or password'
                }
            )
            notify()
        }
    }

    const logout = () => {
        window.localStorage.clear()
        window.location.reload()
    }

    const notify = () => {
        setTimeout(() => {
            setNotification(null)
        }, 5000)
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
                    <BlogForm setBlogs={setBlogs} blogs={blogs}
                        setNotification={setNotification} notify={notify} />

                    <button onClick={() => setBlogFormVisible(false)}>cancel</button>
                </div>
            </div >
        )
    }

    return (
        <div>
            {user ?
                <div>
                    <h2>blogs</h2>
                    <Notification notification={notification} />
                    <br />
                    {user.name} logged in <button onClick={logout}>logout</button>
                    <br />
                    <br />
                    {blogForm()}
                    <br />
                    <Blogs blogs={blogs} setBlogs={setBlogs} user={user.username} />
                </div>

                :
                <div>
                    <h2>Login</h2>
                    <Notification notification={notification} />
                    <br />
                    <LoginForm handleLogin={handleLogin}
                        username={username} handleUsernameChange={({ target }) => setUsername(target.value)}
                        password={password} handlePasswordChange={({ target }) => setPassword(target.value)}
                    />
                </div>
            }
        </div>
    )
}

export default App
