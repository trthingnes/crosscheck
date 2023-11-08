import React, { useState } from 'react'
import { Input } from 'semantic-ui-react'

function PostCreateForm() {
    const [newComment, setNewComment] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(event.target.value)
    }

    const handleSubmit = () => {
        console.log('submit')
    }

    return (
        <Input
            style={{ width: '90%' }}
            action={{ content: 'Submit', onClick: handleSubmit }}
            placeholder="Comment..."
            value={newComment}
            onChange={handleChange}
        />
    )
}
export default PostCreateForm
