import { Container, Grid } from 'semantic-ui-react'
import { useEffect, useState } from 'react'
import { HighlightListElement } from '../components/highlight/HighlightListElement'
import { ShowMoreLessButtons } from '../components/button/ShowMoreLessButtons'
import { VotingContext } from '../components/button/VoteButtons'
import { Highlight, Vote } from '../utils/Types'
import { DEFAULT_SHOW_COUNT } from '../utils/Constants'
import { getHighlightsForUrl, updateHighlight } from '../utils/Firebase'

export function HighlightsPage() {
    const [url, setUrl] = useState('')
    const [showCount, setShowCount] = useState(DEFAULT_SHOW_COUNT)
    const [highlights, setHighlights] = useState<Highlight[]>([])
    const [votes, setVotes] = useState<Vote[]>([])

    // Fetch highlights from database on page load
    useEffect(() => {
        async function getTabUrl() {
            if (chrome.tabs) {
                const tab = await chrome.tabs.query({
                    active: true,
                    currentWindow: true,
                })
                return tab[0]?.url || 'unknown'
            } else {
                return 'localhost'
            }
        }

        getTabUrl().then((url) => {
            setUrl(url)
            getHighlightsForUrl(url).then((highlights) => {
                setHighlights(
                    highlights.sort((a, b) => {
                        return (
                            b.upvotes - b.downvotes - (a.upvotes - a.downvotes)
                        )
                    }),
                )
            })
        })
    }, [])

    // Fetch votes from local storage when the loaded url changes
    useEffect(() => {
        const votesJson = localStorage.getItem(url)
        if (votesJson) {
            setVotes(JSON.parse(votesJson))
        }
    }, [url, highlights.length])

    // Write votes to local storage when they are updated
    useEffect(() => {
        localStorage.setItem(url, JSON.stringify(votes))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [votes])

    function persistVote(highlightId: string, upvote: boolean) {
        const highlight = highlights.find((h) => h.id === highlightId)

        if (highlight) {
            if (upvote) {
                highlight.upvotes++
            } else if (!upvote) {
                highlight.downvotes++
            }
            updateHighlight(highlight)
        }
    }

    return (
        <Grid columns={1} padded>
            <VotingContext.Provider value={[votes, setVotes, persistVote]}>
                {highlights.slice(0, showCount).map((highlight) => (
                    <HighlightListElement
                        key={highlight.id}
                        highlight={highlight}
                    />
                ))}
            </VotingContext.Provider>

            <Grid.Row centered>
                <Container textAlign="center">
                    <ShowMoreLessButtons
                        showCount={showCount}
                        setShowCount={setShowCount}
                        min={DEFAULT_SHOW_COUNT}
                        step={DEFAULT_SHOW_COUNT}
                        max={highlights.length}
                    />
                </Container>
            </Grid.Row>
        </Grid>
    )
}
