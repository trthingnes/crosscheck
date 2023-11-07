import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Highlight } from '../utils/Types'
import { updateHighlight } from '../utils/Firebase'
import { Button, Icon, Label } from 'semantic-ui-react'
import HighlightQuote from './HighlightQuote'

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
        upvote: boolean,
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
        upvote: boolean,
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

    const voteFunctions = {upvoteHighlight, downvoteHighlight, upvoted, downvoted}

    return (
        <div>
            <div style={{paddingLeft:'10px', paddingTop:'10px', width: '450px', height:'400px', overflowY: 'scroll'}}>
                {props.highlights
                    .map((highlight: any, index: number) => {
                        return (
                            <div key={highlight.id}>
                                <HighlightQuote quote={highlight} index={index} link={true} vote = {voteFunctions}/>
                            </div>
                        )
                    })
                    .filter((o: any, k: number) => k < showAmount)}
            </div>

            <div style={{paddingTop:'10px', paddingBottom:'10px'}}>
            <button
                className="ui button" type="button"
                disabled={showAmount >= props.highlights.length}
                onClick={() => moreHighlights()}
            >
                {' '}
                More{' '}
            </button>
            <button
                className="ui button"
                type="button"
                disabled={showAmount <= 3}
                onClick={() => lessHighlights()}
            >
                {' '}
                Less{' '}
            </button>
            </div>
        </div>
    )
}

export default HighlightsList
