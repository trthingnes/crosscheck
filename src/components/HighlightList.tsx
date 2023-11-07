import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Highlight } from '../utils/Types'
import { updateHighlight } from '../utils/Firebase'
import { Button, Icon, Label } from 'semantic-ui-react'

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

    return (
        <div>
            {props.highlights
                .map((highlight: Highlight, index: number) => {
                    return (
                        <div key={highlight.id}>
                            <Link to={`/${highlight.id}`}>
                                {' '}
                                {highlight.quote}
                            </Link>
                            <div>
                                <Button
                                    icon
                                    color="green"
                                    size="tiny"
                                    disabled={upvoted[index]}
                                    onClick={() =>
                                        upvoteHighlight(highlight, index, true)
                                    }
                                >
                                    <Icon name="arrow up" />
                                </Button>
                                <Label>
                                    {highlight.upvotes - highlight.downvotes}
                                </Label>

                                <Button
                                    icon
                                    color="red"
                                    size="tiny"
                                    disabled={downvoted[index]}
                                    onClick={() =>
                                        downvoteHighlight(
                                            highlight,
                                            index,
                                            false,
                                        )
                                    }
                                >
                                    <Icon name="arrow down" />
                                </Button>
                            </div>
                        </div>
                    )
                })
                .filter((o: any, k: number) => k < showAmount)}
            <button
                className="ui button"
                type="button"
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
    )
}

export default HighlightsList
