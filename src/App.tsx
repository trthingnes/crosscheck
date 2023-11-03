import "semantic-ui-css/semantic.min.css"
import "./App.css"
import { useState, useEffect } from "react"
import HighlightItem from "./components/HighlightItem"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import HighlightList from "./components/HighlightList"
import { getHighlightsForUrl } from "utils/Firebase"
import { Highlight } from "utils/Types"

function App() {
  const [highlights, setHighlights] = useState<Highlight[]>([])

  chrome.runtime.onMessage.addListener((selection: string) => {
    console.info("Received message", selection)
  })

  useEffect(() => {
    // TODO: Test data fetching
    console.log("Getting highlights for ", window.location.href)
    getHighlightsForUrl(window.location.href).then((highlights) => {
      setHighlights(
        highlights.sort((a, b) => {
          return b.upvotes - b.downvotes - (a.upvotes - a.downvotes)
        })
      )
    })
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={<HighlightList highlights={highlights} />}
          ></Route>
          <Route
            path="/:id"
            element={<HighlightItem highlights={highlights} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
