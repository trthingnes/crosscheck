import React from "react"
import "./App.css"
import { useState, useEffect } from 'react'
import Login from './components/Login'
import Homepage from './components/Homepage'

function App() {
  const [user, setUser] = useState("")

  if (!user){
    return (
      <div className="App">
      <header className="App-header">
        Crosscheck
      </header>
    <Login setUser={setUser} />
    </div>
      ) 
  } 

  return (
    <div className="App">
      <header className="App-header">
        Crosscheck
      </header>
      <Homepage user={user}/>
    </div>
  )
  }
export default App
