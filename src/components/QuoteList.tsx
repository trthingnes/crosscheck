import React from "react"
import { useState } from 'react'
import {  Link } from "react-router-dom";

function QuoteList(props: { quotes: any }) {
  const [showMore, setShowMore] = useState(false)



  return (
    <div>
      {props.quotes.map((contextAddition: any) => {
        return <div><Link to={`/${contextAddition.id}`}> {contextAddition.content}</Link></div>
    }).filter((o: any,k: number) => k < 3 || showMore)
    }
      <button type="button" onClick={() => setShowMore(!showMore)} >{!showMore ? "More" : "Less"}  </button>
    </div>
  )
}

export default QuoteList 