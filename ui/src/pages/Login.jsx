import React, { useState, useGlobal } from "reactn";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginSuccess, setLoginSuccess] = useState(null)
  const [token, setToken] = useGlobal('token')

  const baseUrl = 'http://localhost:4000'

  const onSubmit = async (evt) => {
    evt.preventDefault()

    try {
      const { data } = await axios.post(`${baseUrl}/auth/login`, {
        username,
        password
      })

      alert('login complete!')

      setToken(data.token)
      setLoginSuccess(true)
    } catch(err) {
      setLoginSuccess(false)
    }
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input 
          type='text' 
          placeholder='Username...'
          value={username} 
          onChange={(evt) => setUsername(evt.target.value)} 
        />
        <input 
          type='text' 
          placeholder='Password...'
          value={password} 
          onChange={(evt) => setPassword(evt.target.value)} 
        />
        <input type="submit" value="Submit" />
      </form>
      <div>
        <Link to="/signup">Need an account?</Link>
      </div>
    { loginSuccess === null ? 
      null : loginSuccess === true ?
        <Redirect to="/home" /> 
        : <div>Failed to login</div> }
    </>
  )
}

export default Login