import { Link } from 'react-router-dom'
import { Grid, Segment } from 'semantic-ui-react'
import { Highlight } from '../utils/Types'
import { VoteButtons } from './button/VoteButtons'

export function HighlightElement({ highlight }: { highlight: Highlight }) {
    return (
        <Grid.Column style={{ padding: '0.5rem' }}>
            <Segment>
                <Grid columns={2}>
                    <Grid.Column verticalAlign="middle" stretched>
                        <Link to={highlight.id || ''}>"{highlight.quote}"</Link>
                    </Grid.Column>
                    <Grid.Column textAlign="right" verticalAlign="middle">
                        <VoteButtons
                            documentId={highlight.id || ''}
                            documentUpvotes={highlight.upvotes}
                            documentDownvotes={highlight.downvotes}
                        />
                    </Grid.Column>
                </Grid>
            </Segment>
        </Grid.Column>
    )
}
