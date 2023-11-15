import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Container, Grid, Header, Icon } from 'semantic-ui-react'
import { ShowMoreLessButtons } from '../components/button/ShowMoreLessButtons'
import { VotingContext } from '../components/button/VoteButtons'
import { PostListElement } from '../components/PostListElement'
import { DEFAULT_SHOW_COUNT } from '../utils/Constants'
import { Highlight, Post, Vote } from '../utils/Types'
import {
    getHighlightById,
    getPostsByHighlightId,
    updatePost,
} from '../utils/Firebase'
import { AddPostForm } from '../components/AddPostForm'

export function PostsPage() {
    const [showCount, setShowCount] = useState(DEFAULT_SHOW_COUNT)

    // Fetch highlight & posts on load and when id changes
    const { id } = useParams()
    const [highlight, setHighlight] = useState<Highlight>()
    const [posts, setPosts] = useState<Post[]>([])
    useEffect(() => {
        getHighlightById(id || '').then(setHighlight)
        getPostsByHighlightId(id || '').then((posts) =>
            setPosts(
                posts.sort((a, b) => {
                    return b.upvotes - b.downvotes - (a.upvotes - a.downvotes)
                }),
            ),
        )
    }, [id])

    // Fetch votes from local storage when the loaded url changes
    const [votes, setVotes] = useState<Vote[]>([])
    useEffect(() => {
        const votesJson = localStorage.getItem(id || '')
        if (votesJson) {
            setVotes(JSON.parse(votesJson))
        }
    }, [id])

    // Write votes to local storage when they are updated
    useEffect(() => {
        localStorage.setItem(id || '', JSON.stringify(votes))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [votes])

    // Save updated vote counts to database
    function persistVote(postId: string, upvote: boolean) {
        const post = posts.find((p) => p.id === postId)

        if (post) {
            if (upvote) {
                post.upvotes++
            } else if (!upvote) {
                post.downvotes++
            }
            updatePost(post)
        }
    }

    return (
        <Grid columns={1} padded>
            <Button.Group style={{ width: '100%' }}>
                <Button as={Link} to={-1}>
                    <Icon name="arrow left" /> Back to list
                </Button>
                <AddPostForm
                    highlightId={id || ''}
                    posts={posts}
                    setPosts={setPosts}
                />
            </Button.Group>
            <Header>Posts for '{highlight?.quote}'</Header>
            {!posts ||
                (!posts.length && (
                    <Container>
                        <Header icon>
                            <Icon name="ban" />
                            There are no posts on this highlight yet! Why not
                            add one by pressing the button above?
                        </Header>
                    </Container>
                ))}
            <VotingContext.Provider value={[votes, setVotes, persistVote]}>
                {posts.slice(0, showCount).map((post: Post) => (
                    <PostListElement key={post.id} post={post} />
                ))}
            </VotingContext.Provider>
            <Grid.Row centered>
                <Container textAlign="center">
                    <ShowMoreLessButtons
                        showCount={showCount}
                        setShowCount={setShowCount}
                        min={DEFAULT_SHOW_COUNT}
                        step={DEFAULT_SHOW_COUNT}
                        max={posts.length}
                    />
                </Container>
            </Grid.Row>
        </Grid>
    )
}
