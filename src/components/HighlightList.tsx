import React from "react"
import { useState } from 'react'
import {  Link } from "react-router-dom";
import { Highlight } from "utils/Types";

function HighlightsList(props: { highlights: Highlight[], voteHighlight: any }) {
  const [showAmount, setShowAmount] = useState(3)

  const moreHighlights = () => {
    const len = props.highlights.length
    setShowAmount(Math.min(len,showAmount+3))
  }

  const lessHighlights = () => {
    setShowAmount(Math.max(3,showAmount-3))
  }

  return (
    <div>
      {props.highlights.map((highlight: any, index: number) => {
        return <div key={highlight.id}><Link to={`/${highlight.id}`}> {highlight.quote}</Link>
        <p> {highlight.upvotes - highlight.downvotes}</p>
              <button className="ui button" type="button" onClick={() => props.voteHighlight(highlight, true)} > Upvote </button>
              <button className="ui button" type="button" onClick={() => props.voteHighlight(highlight, false)}> DownVote </button>

</div>
    }).filter((o: any,k: number) => k < showAmount )
    }
      <button className="ui button" type="button" onClick={() => moreHighlights()} > More </button>
      <button className="ui button" type="button" onClick={() => lessHighlights()} > Less </button>
    </div>
  )
}

export default HighlightsList 