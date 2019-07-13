import React, { useGlobal, useState, useEffect } from "reactn"
import axios from 'axios'

const Home = () => {
  const [token, setToken] = useGlobal('token')
  const [currentUser, setCurrentUser] = useState('')

  const baseUrl = 'http://localhost:4000'

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await axios.get(`${baseUrl}/user/profile`, {
        headers: { 'Authorization' : `Bearer ${token}` }
      })

      setCurrentUser(data)
    }

    getAllUsers()
  }, [token])

  return (
    <div>
      Home page
    </div>
  )
}

export default Home