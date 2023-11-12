import { Link } from 'react-router-dom'
import { Grid, Comment } from 'semantic-ui-react'
import { Highlight } from '../utils/Types'
import { VoteButtons } from './button/VoteButtons'

export function HighlightListElement({ highlight }: { highlight: Highlight }) {
    return (
        <Grid.Column style={{ paddingBottom: 0 }}>
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
                                        {highlight.timestamp
                                            .toDate()
                                            .toDateString()}
                                    </div>
                                </Comment.Metadata>
                                <Comment.Text>"{highlight.quote}"</Comment.Text>
                                <Comment.Actions>
                                    <Comment.Action
                                        as={Link}
                                        to={`/${highlight.id}`}
                                    >
                                        Read posts for this highlight
                                    </Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    </Comment.Group>
                </Grid.Column>
                <Grid.Column textAlign="right" verticalAlign="middle" width={6}>
                    <VoteButtons
                        documentId={highlight.id || ''}
                        documentUpvotes={highlight.upvotes}
                        documentDownvotes={highlight.downvotes}
                    />
                </Grid.Column>
            </Grid>
        </Grid.Column>
    )
}
