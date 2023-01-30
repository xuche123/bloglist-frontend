import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs => {
      const newBlogs = sortBlogs(blogs)
      setBlogs(newBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sortBlogs = (blogs) => {
    const newBlogs = [...blogs]
    newBlogs.sort((a, b) => (a.likes < b.likes) ? 1 : ((b.likes < a.likes) ? -1 : 0))
    return newBlogs
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('error: wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = (newBlog) => {
    blogService
      .create(newBlog)
      .then(returnedBlog => {
        const newBlogs = sortBlogs(blogs.concat(returnedBlog))
        setBlogs(newBlogs)
        setMessage(`success ${returnedBlog.title} by ${returnedBlog.author} is added successfully`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }).catch(err => {
        setMessage(`error: ${err}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const handleLike = (blog) => {
    console.log(blog.id)
    blogService
      .like(blog)
      .then(returnedBlog => {
        const newBlogs = sortBlogs(blogs.map(blog => blog.id === returnedBlog.id ? returnedBlog : blog))
        setBlogs(newBlogs)
        setMessage(`success Liked ${returnedBlog.title} by ${returnedBlog.author}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }).catch(
        err => {
          setMessage(`error ${err}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }
      )
  }

  const handleRemove = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService
        .remove(blog)
        .then(() => {
          const newBlogs = blogs.filter((obj) => obj.id !== blog.id)
          sortBlogs(newBlogs)
          setBlogs(newBlogs)
        }).catch(
          err => {
            setMessage(`error ${err}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          }
        )
    }
  }

  if (user === null) {
    return (
      <div id="login">
        <Notification message={message} />
        <h2>Log in to application</h2>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <div id="blog">
      <div id="header">
        <p>logged in as {user.username}</p>
        <button onClick={handleLogout}>log out</button>
      </div>

      <Notification message={message} />
      <Togglable buttonLabel="Add new entry...">
        <BlogForm
          createBlog={createBlog}
        />
      </Togglable>

      <h1>Blogs</h1>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          user={user}
        />
      )}
    </div>
  )
}

export default App