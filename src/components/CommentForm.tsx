
import React from 'react';
import CrossComment from './Comment';
import CrossCommentList from './CommentList';
import { Input } from 'semantic-ui-react'



const CommentForm = () => (
    //cicle for each doc in collection

    <div >
               
        <Input action='Submit' placeholder='Add comment...' style={{ width:'400px', float:'left',paddingLeft: '10px', paddingTop: '10px'}} />

    </div>

);

export default CommentForm;