import React, { useState, useEffect } from 'react';
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
            setBlogs(allBlogs)
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
                    <h2>create new</h2>
                    <BlogForm setBlogs={setBlogs} blogs={blogs}
                        setNotification={setNotification} notify={notify} />
                    <br />
                    <Blogs blogs={blogs} />
                </div>
                :
                <div>
                    <h2>Login</h2>
                    <Notification notification={notification} />
                    <br />
                    <LoginForm handleLogin={handleLogin}
                        username={username} setUsername={setUsername}
                        password={password} setPassword={setPassword}
                    />
                </div>
            }
        </div>
    )
}

export default App
