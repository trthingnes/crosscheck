import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Highlight } from 'utils/Types'
import { updateHighlight } from 'utils/Firebase'
import { Button, Icon, Label, Card } from 'semantic-ui-react'

function HighlightsList(props: {
  highlights: Highlight[]
  setHighlights: any
}) {
  const [showAmount, setShowAmount] = useState(3)
  const [upvoted, setUpvoted] = useState(
    Array(props.highlights.length).fill(false),
  )
  const [downvoted, setDownvoted] = useState(
    Array(props.highlights.length).fill(false),
  )

  const moreHighlights = () => {
    const len = props.highlights.length
    setShowAmount(Math.min(len, showAmount + 3))
  }

  const lessHighlights = () => {
    setShowAmount(Math.max(3, showAmount - 3))
  }

  const upvoteHighlight = (
    highlight: Highlight,
    index: number,
  ) => {
    highlight.upvotes++
    if (downvoted[index]) {
      const newDownvoted = [...downvoted]
      newDownvoted[index] = false
      setDownvoted(newDownvoted)
    } else {
      const newUpvoted = [...upvoted]
      newUpvoted[index] = true
      setUpvoted(newUpvoted)
    }
    updateHighlight(highlight).then(() => {
      const newHighlights = [...props.highlights]
      newHighlights[index] = highlight
      props.setHighlights(newHighlights)
    })
  }

  const downvoteHighlight = (
    highlight: Highlight,
    index: number,
  ) => {
    highlight.upvotes--
    if (upvoted[index]) {
      const newUpvoted = [...upvoted]
      newUpvoted[index] = false
      setUpvoted(newUpvoted)
    } else {
      const newDownvoted = [...downvoted]
      newDownvoted[index] = true
      setDownvoted(newDownvoted)
    }
    updateHighlight(highlight).then(() => {
      const newHighlights = [...props.highlights]
      newHighlights[index] = highlight
      props.setHighlights(newHighlights)
    })
  }

  return (
    <div>
      {props.highlights
        .map((highlight: any, index: number) => {
          return (
            <div key={highlight.id}>
              <Card>
              <Link to={`/${highlight.id}`}>
                {' '}
                {highlight.quote}
              </Link>
              <div >
                <Button
                  style={{"margin":"5px"}}
                  icon
                  color="green"
                  size="tiny"
                  disabled={upvoted[index]}
                  onClick={() =>
                    upvoteHighlight(highlight, index)
                  }
                >
                  <Icon name="arrow up" />
                </Button>
                <Label>
                  {highlight.upvotes - highlight.downvotes}
                </Label>

                <Button
                  style={{"margin":"5px"}}
                  icon
                  color="red"
                  size="tiny"
                  disabled={downvoted[index]}
                  onClick={() =>
                    downvoteHighlight(
                      highlight,
                      index,
                    )
                  }
                >
                  <Icon name="arrow down" />
                </Button>
              </div>
              </Card>
            </div>
          )
        })
        .filter((o: any, k: number) => k < showAmount)}
        <div style={{width: '290px',padding:'10px'}}>
      <Button
        className="ui icon button"
        type="button"
        disabled={showAmount >= props.highlights.length}
        onClick={() => moreHighlights()}
      >
        <Icon name="angle double down" />
      </Button>
      <Button
      
        className="ui icon button"
        type="button"
        disabled={showAmount <= 3}
        onClick={() => lessHighlights()}
      >
        <Icon  name="angle double up"  />
      </Button>
      </div>
    </div>
  )
}

export default HighlightsList
