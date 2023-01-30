import React from 'react'

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {
  return (
    <form onSubmit={handleLogin}>
      <label form="username" >
                Username
      </label>
      <input
        type="text"
        value={username}
        name="username"
        id="username"
        onChange={({ target }) =>
          setUsername(target.value)
        }
      />
      <label form="password" >
                password
      </label>
      <input
        type="password"
        value={password}
        name="password"
        id="password"
        onChange={({ target }) =>
          setPassword(target.value)
        }
      />

      <button type="submit">Login</button>

    </form>
  )
}

export default LoginForm