import { Comment, Grid } from 'semantic-ui-react'
import { Post } from '../utils/Types'
import { VoteButtons } from './button/VoteButtons'

export function PostListElement({ post }: { post: Post }) {
    function cutUrl(url: string) {
        try {
            return new URL(url).hostname
        } catch (error) {
            console.info(
                `Could not cut URL '${url}' because it does not validate.`,
            )
        }

        return url
    }

    return (
        <Grid.Column>
            <Grid columns="equal">
                <Grid.Column verticalAlign="middle">
                    <Comment.Group>
                        <Comment>
                            <Comment.Content>
                                <Comment.Author as="span">
                                    Anonymous
                                </Comment.Author>
                                <Comment.Metadata>
                                    <div>
                                        {post.timestamp.toDate().toDateString()}
                                    </div>
                                </Comment.Metadata>
                                <Comment.Text>{post.comment}</Comment.Text>
                                <Comment.Actions>
                                    {post.sources.map((source, i) => (
                                        <Comment.Action
                                            key={i}
                                            href={source}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {cutUrl(source)}
                                        </Comment.Action>
                                    ))}
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    </Comment.Group>
                </Grid.Column>
                <Grid.Column textAlign="right" verticalAlign="middle" width={6}>
                    <VoteButtons
                        documentId={post.id || ''}
                        documentUpvotes={post.upvotes}
                        documentDownvotes={post.downvotes}
                    />
                </Grid.Column>
            </Grid>
        </Grid.Column>
    )
}
