import "semantic-ui-css/semantic.min.css"
import "./App.css"
import { useState } from "react"
import Login from "./components/Login"
import Homepage from "./components/Homepage"

function App() {
  const [user, setUser] = useState("")

  if (!user) {
    return (
      <div className="App">
        <header className="App-header">Crosscheck</header>
        <Login setUser={setUser} />
      </div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">Crosscheck</header>
      <Homepage user={user} />
    </div>
  )
}
export default App
