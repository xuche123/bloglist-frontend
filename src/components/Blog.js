import { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const [visible, setVisible] = useState(false)
  const [like, setLike] = useState(false)

  const blogStyle = {
    backgroundColor: 'white',
    color: 'black',
    padding: '5px',
    margin: '5px 0px'
  }

  const handleClick = (blog) => {
    handleLike(blog)
    setLike(true)
  }
  return (
    <div className="blog-entry" style={blogStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>{blog.title}</div>
        <button onClick={() => {
          setVisible(!visible)
        }}>view</button>
      </div>
      {visible &&
        <div>
          <div>Url: {blog.url}</div>
          <div>Likes: {blog.likes}
            {!like && <button onClick={() => handleClick(blog)}>like</button>}
            {like && <button >liked!!</button>}
          </div>
          <div>Author: {blog.author}</div>
          <div>{blog.id}</div>
        </div>
      }

      {blog.user.username === user.username && <button onClick={() => handleRemove(blog)}>remove</button>}

    </div>
  )

}

export default Blog