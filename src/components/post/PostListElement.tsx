import { Card, Grid } from 'semantic-ui-react'
import { Post } from '../../utils/Types'
import { VoteButtons } from '../button/VoteButtons'

export function PostListElement({ post }: { post: Post }) {
    return (
        <Grid.Column style={{ padding: '0.5rem 0' }}>
            <Card centered style={{ width: '90%' }}>
                <Card.Content>
                    <Card.Description>{post.comment}</Card.Description>
                    <Card.Meta>10/10/2021 at 5:04PM</Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <VoteButtons
                        documentId={post.id || ''}
                        documentUpvotes={post.upvotes}
                        documentDownvotes={post.downvotes}
                    />
                </Card.Content>
            </Card>
        </Grid.Column>
    )
}
