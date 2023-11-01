import React from "react"
import { useState } from 'react'

function ContextAddition(props: any) {

  return (
    <div>
     Context: {props.contextAddition.content} By: {props.contextAddition.user} Score: {props.contextAddition.score}
    </div>
  )
}

export default ContextAddition 