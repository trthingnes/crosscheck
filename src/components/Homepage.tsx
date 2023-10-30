import React from "react"
import { useState, useEffect } from 'react'
import AddContextForm from "./AddContextForm"
import ContextAdditions from "./ContextAdditionsList"

function Homepage(props: { user: string}) {

  const [showForm, setShowForm] = useState(false)
  const [contextAdditions, setContextAdditions] = useState([{}])

  useEffect(() => {
    //hardcoded data
    const data = [{content: "aaa", user: "one", score: -6},{content: "bb", user: "two", score: 6},{content: "cc", user: "three", score: 2},{content: "dd", user: "four", score: -20}]
    data.sort((a,b) => {return b.score - a.score})
    setContextAdditions(data)
  }, []);

  return (
    <div>
     <div>
        Hello {props.user}
      </div>
      <button type="button" onClick={() => setShowForm(!showForm)} >{!showForm ? "Contribute Context" : "Hide Form"}  </button>
      {showForm &&
        <AddContextForm />
      }
      <ContextAdditions contextAdditions={contextAdditions}/>
    </div>
  )
}

export default Homepage