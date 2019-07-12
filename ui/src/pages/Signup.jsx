import React, { useState } from "reactn";
import { Link } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const onSubmit = (evt) => {
    evt.preventDefault()

    alert('submitted signup!')
  }

  return (
    <>
      <h2>Signup</h2>
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
        <input 
          type='text' 
          placeholder='Password Confirm...'
          value={passwordConfirm} 
          onChange={(evt) => setPasswordConfirm(evt.target.value)} 
        />
        <input type="submit" value="Submit" />
      </form>
      <div>
        <Link to="/">Back to Login</Link>
      </div>
    </>
  )
}

export default Signup