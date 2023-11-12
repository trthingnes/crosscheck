import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
    Button,
    Container,
    Form,
    Grid,
    Header,
    Icon,
    Modal,
} from 'semantic-ui-react'
import { ShowMoreLessButtons } from '../components/button/ShowMoreLessButtons'
import { VotingContext } from '../components/button/VoteButtons'
import { PostListElement } from '../components/PostListElement'
import { DEFAULT_SHOW_COUNT } from '../utils/Constants'
import { Post, Vote } from '../utils/Types'
import {
    addPostToHighlight,
    getPostsByHighlightId,
    updatePost,
} from '../utils/Firebase'
import { Timestamp } from 'firebase/firestore'

export function PostsPage() {
    const [showCount, setShowCount] = useState(DEFAULT_SHOW_COUNT)
    const [votes, setVotes] = useState<Vote[]>([])
    const [posts, setPosts] = useState<Post[]>([])

    const [addPostModalOpen, setAddPostModalOpen] = useState<boolean>(false)
    const [comment, setComment] = useState('')
    const [source, setSource] = useState('')

    const { id } = useParams()

    useEffect(() => {
        getPostsByHighlightId(id || '').then((posts) =>
            setPosts(
                posts.sort((a, b) => {
                    return b.upvotes - b.downvotes - (a.upvotes - a.downvotes)
                }),
            ),
        )
    }, [id])

    // Fetch votes from local storage when the loaded url changes
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

    const persistPost = () => {
        setAddPostModalOpen(false)
        let newPost: Post = {
            comment: comment,
            sources: [source],
            upvotes: 0,
            downvotes: 0,
            timestamp: Timestamp.now(),
        }
        addPostToHighlight(id || '', newPost)

        let newPosts = [...posts, newPost].sort((a, b) => {
            return b.upvotes - b.downvotes - (a.upvotes - a.downvotes)
        })
        setPosts(newPosts)
    }

    return (
        <Grid columns={1} padded>
            <Grid.Row centered>
                <Button.Group>
                    <Button as={Link} to={-1}>
                        <Icon name="arrow left" /> Back to list
                    </Button>

                    <Modal
                        trigger={
                            <Button color="green">
                                <Icon name="plus" /> Add a post
                            </Button>
                        }
                        open={addPostModalOpen}
                        onOpen={() => setAddPostModalOpen(true)}
                        onClose={() => setAddPostModalOpen(false)}
                    >
                        <Modal.Header>Add a post</Modal.Header>
                        <Modal.Content>
                            <Form onSubmit={persistPost}>
                                <Form.Group widths="equal">
                                    <Form.Input
                                        value={comment}
                                        placeholder="Comment"
                                        onChange={(e) =>
                                            setComment(e.target.value || '')
                                        }
                                    />
                                    <Form.Input
                                        value={source}
                                        placeholder="Source"
                                        onChange={(e) =>
                                            setSource(e.target.value || '')
                                        }
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Button
                                        type="button"
                                        secondary
                                        onClick={() =>
                                            setAddPostModalOpen(false)
                                        }
                                    >
                                        Cancel
                                    </Form.Button>
                                    <Form.Button primary>Submit</Form.Button>
                                </Form.Group>
                            </Form>
                        </Modal.Content>
                    </Modal>
                </Button.Group>
            </Grid.Row>
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
