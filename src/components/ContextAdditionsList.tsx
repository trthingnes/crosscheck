import React from "react"
import { useState } from 'react'
import ContextAddition from './ContextAddition'

function ContextAdditions(props: { contextAdditions: any }) {
  const [showMore, setShowMore] = useState(false)


  return (
    <div>
      {props.contextAdditions.map((contextAddition: any) => {
        return <ContextAddition contextAddition={contextAddition}/>
    }).filter((o: any,k: number) => k < 3 || showMore)
    }
      <button type="button" onClick={() => setShowMore(!showMore)} >{!showMore ? "More" : "Less"}  </button>
    </div>
  )
}

export default ContextAdditions 