import { useState } from 'react'
import { Button, Form, Icon, Modal } from 'semantic-ui-react'
import { Timestamp } from 'firebase/firestore'
import { LOCALSTORAGE_CONTRIBUTIONS_KEY } from '../utils/Constants'
import { Post } from '../utils/Types'
import { addPostToHighlight } from '../utils/Firebase'

export function AddPostForm({
    highlightId,
    posts,
    setPosts,
}: {
    highlightId: string
    posts: Post[]
    setPosts: (p: Post[]) => void
}) {
    // Variables connected to the new post form
    const [addPostModalOpen, setAddPostModalOpen] = useState<boolean>(false)
    const [comment, setComment] = useState('')
    const [source, setSource] = useState('')

    // Save new post to database
    const persistPost = () => {
        setAddPostModalOpen(false)
        let newPost: Post = {
            comment: comment,
            sources: [source],
            upvotes: 0,
            downvotes: 0,
            timestamp: Timestamp.now(),
        }
        addPostToHighlight(highlightId, newPost)

        let newPosts = [...posts, newPost].sort((a, b) => {
            return b.upvotes - b.downvotes - (a.upvotes - a.downvotes)
        })
        setPosts(newPosts)

        const contributions = Number.parseInt(
            localStorage.getItem(LOCALSTORAGE_CONTRIBUTIONS_KEY) || '0',
        )
        localStorage.setItem(
            LOCALSTORAGE_CONTRIBUTIONS_KEY,
            (contributions + 1).toString(),
        )
    }

    return (
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
                            onChange={(e) => setComment(e.target.value || '')}
                        />
                        <Form.Input
                            value={source}
                            placeholder="Source"
                            onChange={(e) => setSource(e.target.value || '')}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Button
                            type="button"
                            secondary
                            onClick={() => setAddPostModalOpen(false)}
                        >
                            Cancel
                        </Form.Button>
                        <Form.Button primary>Submit</Form.Button>
                    </Form.Group>
                </Form>
            </Modal.Content>
        </Modal>
    )
}
