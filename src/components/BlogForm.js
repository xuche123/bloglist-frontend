import React from 'react'
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: ''
  })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({
      title: '',
      author: '',
      url: '',
      likes: ''
    })
  }

  return (
    <form onSubmit={addBlog} id="blogform">
      <label htmlFor="title">title</label>
      <input
        value={newBlog.title}
        id="title"
        onChange={(event) => setNewBlog({ ...newBlog, title: event.target.value })}
      />
      <label htmlFor="author">author</label>
      <input
        value={newBlog.author}
        id="author"
        onChange={(event) => setNewBlog({ ...newBlog, author: event.target.value })}
      />
      <label htmlFor="url">url</label>
      <input
        value={newBlog.url}
        id="url"
        onChange={(event) => setNewBlog({ ...newBlog, url: event.target.value })}
      />
      <label htmlFor="likes">likes</label>
      <input
        value={newBlog.likes}
        id="likes"
        type="number"
        onChange={(event) => setNewBlog({ ...newBlog, likes: event.target.value })}
      />

      <button type="submit">save</button>
    </form>
  )

}

export default BlogForm