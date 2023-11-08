import React from 'react'
import { Card } from 'semantic-ui-react'
import Vote from './Vote'
import { Post } from '../utils/Types'
import './componentsCss/HighlightQuote.css'

const mex = 'This is Fake News!'

export function Comment(props: { comment: Post; index: any; vote: any }) {
    return (
        <div style={{ paddingTop: '5px', paddingBottom: '5px' }}>
            <Card style={{ width: '400px', height: 'auto' }}>
                <Card.Content>
                    <div className="quote">
                        <div>
                            <Card.Description
                                style={{ width: '260px', paddingRight: '10px' }}
                                textAlign="left"
                            >
                                {props.comment.comment}
                            </Card.Description>
                            <Card.Meta
                                textAlign="left"
                                style={{ fontSize: '12px' }}
                            >
                                10/10/2021 at 5:04PM
                            </Card.Meta>
                        </div>
                        <Vote
                            element={props.comment}
                            index={props.index}
                            vote={props.vote}
                        />
                    </div>
                </Card.Content>
            </Card>
        </div>
    )
}

export default Comment
