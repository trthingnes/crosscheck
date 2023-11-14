import { Container, Grid, Header, Icon, Segment } from 'semantic-ui-react'
import { useEffect, useState } from 'react'
import { HighlightListElement } from '../components/HighlightListElement'
import { ShowMoreLessButtons } from '../components/button/ShowMoreLessButtons'
import { VotingContext } from '../components/button/VoteButtons'
import { Highlight, Vote } from '../utils/Types'
import {
    DEFAULT_SHOW_COUNT,
    LOCALSTORAGE_CONTRIBUTIONS_KEY,
} from '../utils/Constants'
import {
    getHighlightsForUrl,
    getTotalLast7Days,
    updateHighlight,
} from '../utils/Firebase'

export function HighlightsPage() {
    const [showCount, setShowCount] = useState(DEFAULT_SHOW_COUNT)

    // Get url and highlights for page on load
    const [url, setUrl] = useState('')
    const [highlights, setHighlights] = useState<Highlight[]>([])
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

    // Get this users contributions and all user contributions
    const usersContributions =
        localStorage.getItem(LOCALSTORAGE_CONTRIBUTIONS_KEY) || '0'
    const [totalContributions, setTotalContributions] = useState(0)
    useEffect(() => {
        getTotalLast7Days().then((res) => {
            setTotalContributions(res)
        })
    }, [])

    // Fetch votes from local storage when the loaded url changes
    const [votes, setVotes] = useState<Vote[]>([])
    useEffect(() => {
        const votesJson = localStorage.getItem(url)
        if (votesJson) {
            setVotes(JSON.parse(votesJson))
        }
    }, [url])

    // Write votes to local storage when they are updated
    useEffect(() => {
        localStorage.setItem(url, JSON.stringify(votes))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [votes])

    // Save updated vote counts to database
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
            <Segment size="tiny" textAlign="center">
                <Icon name="group" />
                You have contributed {usersContributions} out of{' '}
                {totalContributions} total items in the last 7 days.
            </Segment>
            {!highlights ||
                (!highlights.length && (
                    <Container>
                        <Header icon>
                            <Icon name="ban" />
                            There are no highlights on this page yet! Why not
                            add one by marking some text and submitting it
                            through the context menu?
                        </Header>
                    </Container>
                ))}
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
