import React, { useState } from "reactn";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const baseUrl = 'http://localhost:4000'

  const onSubmit = async (evt) => {
    evt.preventDefault()
    setSignupSuccess(false)

    try {
      await axios.post(`${baseUrl}/auth/signup`, {
        username,
        password,
        passwordConfirm
      })

      alert('signup complete!')
      setErrorMessage(null)
      setSignupSuccess(true)
    } catch(err) {
      setErrorMessage(err.response.data.error)
    }
  }

  return (
    <>
      {!signupSuccess ? 
        (<>
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
            { errorMessage === null ? null : <div>{errorMessage}</div>}
            <div>
              <Link to="/">Back to Login</Link>
            </div>
        </>) 
        : <Redirect to="/" />
      }
    </>
  )
}

export default Signup