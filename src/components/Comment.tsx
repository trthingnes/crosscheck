import React from 'react'
import { Card } from 'semantic-ui-react'

const mex = "This is Fake News!";

const Comment = () => (
    <Card style={{ width: '300px', height: 'auto'}}>

        <Card.Content>
            <Card.Description textAlign='left' >
                {mex}
            </Card.Description>
            <Card.Meta textAlign='left' style={{ fontSize: '12px' }}>
                10/10/2021 at 5:04PM
            </Card.Meta>
        </Card.Content>
    </Card>
);

export default Comment;