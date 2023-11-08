import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Label } from 'semantic-ui-react'
import { updateHighlight } from '../utils/Firebase'
import { Highlight } from '../utils/Types'
import { HIGHLIGHT_BATCH_SIZE } from '../utils/Constants'
import HighlightQuote from './HighlightQuote'

function HighlightsList({
    highlights,
    setHighlights,
}: {
    highlights: Highlight[]
    setHighlights: (highlights: Highlight[]) => void
}) {
    const [showAmount, setShowAmount] = useState(HIGHLIGHT_BATCH_SIZE)
    const [isUpvoted, setIsUpvoted] = useState(
        Array(highlights.length).fill(false),
    )
    const [isDownvoted, setIsDownvoted] = useState(
        Array(highlights.length).fill(false),
    )

    const updateHighlightInState = (highlight: Highlight) => {
        const updatedHighlights = [...highlights]
        updatedHighlights[highlights.findIndex((h) => h.id === highlight.id)] =
            highlight
        setHighlights(updatedHighlights)
    }

    const upvoteHighlight = (highlight: Highlight, index: number) => {
        highlight.upvotes++
        if (isDownvoted[index]) {
            const newDownvoted = [...isDownvoted]
            newDownvoted[index] = false
            setIsDownvoted(newDownvoted)
        } else {
            const newUpvoted = [...isUpvoted]
            newUpvoted[index] = true
            setIsUpvoted(newUpvoted)
        }
        updateHighlight(highlight).then(() => updateHighlightInState(highlight))
    }

    const downvoteHighlight = (highlight: Highlight, index: number) => {
        highlight.upvotes--
        if (isUpvoted[index]) {
            const newUpvoted = [...isUpvoted]
            newUpvoted[index] = false
            setIsUpvoted(newUpvoted)
        } else {
            const newDownvoted = [...isDownvoted]
            newDownvoted[index] = true
            setIsDownvoted(newDownvoted)
        }
        updateHighlight(highlight).then(() => updateHighlightInState(highlight))
    }

    const voteFunctions = {
        up: upvoteHighlight,
        down: downvoteHighlight, 
        upvoted: upvoted, 
        downvoted: downvoted
    }

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
                id="show-more-button"
                className="ui button"
                type="button"
                disabled={showAmount >= highlights.length}
                onClick={() =>
                    setShowAmount(
                        Math.min(
                            highlights.length,
                            showAmount + HIGHLIGHT_BATCH_SIZE,
                        ),
                    )
                }
            >
                More
            </button>
            <button
                id="show-less-button"
                className="ui button"
                type="button"
                disabled={showAmount <= 3}
                onClick={() =>
                    setShowAmount(
                        Math.max(
                            HIGHLIGHT_BATCH_SIZE,
                            showAmount - HIGHLIGHT_BATCH_SIZE,
                        ),
                    )
                }
            >
                Less
            </button>
            </div>
        </div>
    )
}

export default HighlightsList
