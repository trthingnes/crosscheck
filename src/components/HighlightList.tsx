import { useState, useEffect } from 'react'
import { updateHighlight } from '../utils/Firebase'
import { Highlight } from '../utils/Types'
import { DEFAULT_SHOW_COUNT } from '../utils/Constants'
import HighlightQuote from './HighlightQuote'

function HighlightsList({
    highlights,
    setHighlights,
    url,
}: {
    highlights: Highlight[]
    setHighlights: (highlights: Highlight[]) => void
    url: string
}) {
    const [showAmount, setShowAmount] = useState(DEFAULT_SHOW_COUNT)
    const [isUpvoted, setIsUpvoted] = useState(
        Array(highlights.length).fill(false),
    )
    const [isDownvoted, setIsDownvoted] = useState(
        Array(highlights.length).fill(false),
    )

    useEffect(() => {
        const votesFromStorage = localStorage.getItem(url)
        if (votesFromStorage) {
            const votes = JSON.parse(votesFromStorage)
            const newIsUpvoted = []
            const newIsDownvoted = []
            for (let i = 0; i < highlights.length; i++) {
                newIsUpvoted[i] = votes.upvoted[i] ? true : false
                newIsDownvoted[i] = votes.downvoted[i] ? true : false
            }
            setIsUpvoted(newIsUpvoted)
            setIsDownvoted(newIsDownvoted)
        }
    }, [url, highlights.length])

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
            localStorage.setItem(
                url,
                JSON.stringify({ upvoted: isUpvoted, downvoted: newDownvoted }),
            )
        } else {
            const newUpvoted = [...isUpvoted]
            newUpvoted[index] = true
            setIsUpvoted(newUpvoted)
            localStorage.setItem(
                url,
                JSON.stringify({ upvoted: newUpvoted, downvoted: isDownvoted }),
            )
        }
        updateHighlight(highlight).then(() => updateHighlightInState(highlight))
    }

    const downvoteHighlight = (highlight: Highlight, index: number) => {
        highlight.upvotes--
        if (isUpvoted[index]) {
            const newUpvoted = [...isUpvoted]
            newUpvoted[index] = false
            setIsUpvoted(newUpvoted)
            localStorage.setItem(
                url,
                JSON.stringify({ upvoted: newUpvoted, downvoted: isDownvoted }),
            )
        } else {
            const newDownvoted = [...isDownvoted]
            newDownvoted[index] = true
            setIsDownvoted(newDownvoted)
            localStorage.setItem(
                url,
                JSON.stringify({ upvoted: isUpvoted, downvoted: newDownvoted }),
            )
        }
        updateHighlight(highlight).then(() => updateHighlightInState(highlight))
    }

    const voteFunctions = {
        up: upvoteHighlight,
        down: downvoteHighlight,
        upvoted: isUpvoted,
        downvoted: isDownvoted,
    }

    return (
        <div>
            <div
                style={{
                    paddingLeft: '10px',
                    paddingTop: '10px',
                    width: '450px',
                    height: '400px',
                    overflowY: 'scroll',
                }}
            >
                {highlights
                    .map((highlight: any, index: number) => {
                        return (
                            <div key={highlight.id}>
                                <HighlightQuote
                                    quote={highlight}
                                    index={index}
                                    link={true}
                                    vote={voteFunctions}
                                />
                            </div>
                        )
                    })
                    .filter((o: any, k: number) => k < showAmount)}
            </div>

            <div style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                <button
                    id="show-more-button"
                    className="ui button"
                    type="button"
                    disabled={showAmount >= highlights.length}
                    onClick={() =>
                        setShowAmount(
                            Math.min(
                                highlights.length,
                                showAmount + DEFAULT_SHOW_COUNT,
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
                                DEFAULT_SHOW_COUNT,
                                showAmount - DEFAULT_SHOW_COUNT,
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
