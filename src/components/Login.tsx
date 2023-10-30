import React from "react"
import { useState, useEffect } from 'react'

function Login(props: { setUser: (arg0: string) => void }) {
  const [userName, setUserName] = useState("")

  const handleLogin = () => {
    props.setUser(userName)
  }
  return (
    <div>
     <form onSubmit={handleLogin}>
      <label>
        Input your username: 
        <input type="text" value={userName} onChange={(event) => {setUserName(event.target.value)}}/>
        <input type="submit" value="Submit" />
      </label>
     </form>
    </div>
  )
}

export default Login