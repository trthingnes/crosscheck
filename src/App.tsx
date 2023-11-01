import "semantic-ui-css/semantic.min.css"
import "./App.css"
import { useState, useEffect } from 'react'
import Quote from './components/Quote'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuoteList from "./components/QuoteList"

function App() {

  const [quotes, setQuotes] = useState([{}])

  useEffect(() => {
    //hardcoded data
    const data = [{content: "aaa", user: "one", score: -6, id:'1'},{content: "bb", user: "two", score: 6, id:'2'},{content: "cc", user: "three", score: 2, id:'3'},{content: "dd", user: "four", score: -20, id:'4'}]
    data.sort((a,b) => {return b.score - a.score})
    setQuotes(data)
  }, []);



  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuoteList quotes={quotes} />}></Route>
        <Route path="/:quoteID"   element={<Quote quotes={quotes} />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}
export default App
