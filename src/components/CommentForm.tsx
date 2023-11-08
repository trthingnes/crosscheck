
import React, { useState } from 'react';
import { Input } from 'semantic-ui-react'
import { addPost } from '../utils/Firebase';
import { Post } from '../utils/Types';



function CommentForm(){
    const [newComment, setNewComment] = useState('');
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewComment(event.target.value);
    };

    const handleSubmit = () => {
       
        
        console.log('submit')
    }
  
    return (
      <div>
        <Input 
        style={{ width:'400px', float:'left',paddingLeft: '10px', paddingTop: '10px'}}
        action={{ content: 'Submit', onClick: handleSubmit }} placeholder='Comment...' value={newComment} onChange={handleChange} />
      </div>
    );
  };
export default CommentForm;