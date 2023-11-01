import React from "react"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

function Quote(props: { quotes: any }) {
  let { quoteID } = useParams()
  const [quote, setQuote] = useState({})

  useEffect(() => {
    setQuote(props.quotes.find((i: any) => (i.id = quoteID)))
  }, [props.quotes, quoteID])

  return (
    <div>
      <div>{JSON.stringify(quote)}</div>
      <Link to={"/"}>Back</Link>
    </div>
  )
}

export default Quote
