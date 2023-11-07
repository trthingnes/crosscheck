import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Label } from 'semantic-ui-react'

function Vote(props: { highlight: any, index: number, vote: any }) {

     
        return (
                <div >
                
                <Button icon color="green"  size="tiny" disabled={props.vote.upvoted[props.index]}
                                    onClick={() =>
                                        props.vote.upvoteHighlight(props.highlight, props.index, true)
                                    }>
                    <Icon name="arrow up" />
                </Button>

                <Label>
                    {props.highlight.upvotes - props.highlight.downvotes}
                </Label>

                <Button icon color="red" size="tiny" disabled={props.vote.downvoted[props.index]}
                                    onClick={() =>
                                        props.vote.downvoteHighlight(props.highlight,props.index,false)
                                    }>
                   <Icon name="arrow down" />
                </Button>
                </div>
                
         )
        
}
export default Vote