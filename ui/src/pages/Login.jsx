import React, { useState, useGlobal } from "reactn";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginSuccess, setLoginSuccess] = useState(null)
  const [token, setToken] = useGlobal('token')

  const baseUrl = 'http://localhost:4000'

  const onSubmit = async (evt) => {
    evt.preventDefault()
    setLoginSuccess(false)

    try {
      const { data } = await axios.post(`${baseUrl}/auth/login`, {
        email,
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
          placeholder='Email...'
          value={email} 
          onChange={(evt) => setEmail(evt.target.value)} 
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