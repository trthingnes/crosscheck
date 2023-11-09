import { Link } from 'react-router-dom'
import { Grid, Segment } from 'semantic-ui-react'
import { Highlight } from '../../utils/Types'
import { VoteButtons } from '../button/VoteButtons'

export function HighlightListElement({ highlight }: { highlight: Highlight }) {
    return (
        <Grid.Column>
            <Segment>
                <Grid columns="equal" stretched>
                    <Grid.Column verticalAlign="middle">
                        <Link to={`/${highlight.id}`}>"{highlight.quote}"</Link>
                    </Grid.Column>
                    <Grid.Column
                        textAlign="right"
                        verticalAlign="middle"
                        width={6}
                    >
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
