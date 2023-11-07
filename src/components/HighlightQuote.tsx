import React from "react"
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { Button, Card } from "semantic-ui-react";
import Vote from "./Vote";
import './HighlightQuote.css'



const HighlightQuote = (props: { quote: any, index:any, link: any, vote: any}) => (
    <div style={{paddingTop:'5px', paddingBottom:'5px'}}>
    <Card style={{ width: '400px', height: 'auto'}}>

        <Card.Content>
            <Card.Description className = 'quote'  >
                    <div className='quote'>
                    {props.link? <Link style={{width:'260px', paddingRight:'10px'}} to={`/${props.quote.id}`}> {props.quote.quote}</Link> : props.quote.quote}
                    
                    <Vote highlight={props.quote} index={props.index} vote={props.vote} />
                    </div>
                
            </Card.Description>
        </Card.Content>
    </Card>
    </div>
);


export default HighlightQuote 