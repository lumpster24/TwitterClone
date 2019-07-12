import React, { useState } from "reactn";
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (evt) => {
    evt.preventDefault()

    alert('submitted login!')
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
    </>
  )
}

export default Login