import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Container, Grid } from 'semantic-ui-react'
import { ShowMoreLessButtons } from '../components/button/ShowMoreLessButtons'
import { VotingContext } from '../components/button/VoteButtons'
import { PostListElement } from '../components/post/PostListElement'
import CommentForm from '../components/CommentForm'
import { DEFAULT_SHOW_COUNT } from '../utils/Constants'
import { Post, Vote } from '../utils/Types'
import { getPostsByHighlightId, updatePost } from '../utils/Firebase'

export function PostsPage() {
    const [showCount, setShowCount] = useState(DEFAULT_SHOW_COUNT)
    const [votes, setVotes] = useState<Vote[]>([])
    const [posts, setPosts] = useState<Post[]>([])

    const { id } = useParams()

    useEffect(() => {
        getPostsByHighlightId(id || '').then(setPosts)
    }, [id])

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
        <Grid columns={1}>
            <Grid.Row centered>
                <CommentForm />
            </Grid.Row>
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
