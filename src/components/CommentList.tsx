
import React from 'react';
import CrossComment from './Comment';
import { List } from 'semantic-ui-react';

const CommentList = () => (
    //cicle for each doc in collection

    <div style={{width: '340px', height:'240px', overflowY: 'scroll'}}>
        <List>
            <CrossComment/>
            <CrossComment/>
            <CrossComment/>
            <CrossComment/>
        </List>
       
    </div>
);

export default CommentList;