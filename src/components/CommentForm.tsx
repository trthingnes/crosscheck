
import React from 'react';
import CrossComment from './Comment';
import CrossCommentList from './CommentList';
import { Input } from 'semantic-ui-react'



const CommentForm = () => (
    //cicle for each doc in collection

    <div style={{paddingLeft: '10px', paddingTop: '10px',
        width: 350,
        height: 350,
        backgroundColor: 'grey',}}>
               
        <Input size='large' action='Submit' placeholder='Add comment...' style={{  float:'left', paddingTop: '10px' }} />

    </div>

);

export default CommentForm;