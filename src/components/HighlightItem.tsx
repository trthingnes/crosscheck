import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Highlight, Post } from '../utils/Types'
import { getPostsByHighlight } from '../utils/Firebase'
import HighlightQuote from './HighlightQuote'
import { Button, CommentGroup, Label } from 'semantic-ui-react'
import CommentList from './CommentList'
import CommentForm from './CommentForm'

function HighlightItem({ highlights }: { highlights: Highlight[] }) {
    const { id } = useParams()
    const [highlight, setHighlight] = useState<Highlight>()
    const [posts, setPosts] = useState<Post[]>([])
    

    useEffect(() => {
        setHighlight(highlights.find((i: Highlight) => i.id === id))
        getPostsByHighlight(id ? id : '').then((res) => {
            setPosts(res)
        })
    }, [highlights, id])

    return (
        <div >
            <div className='commentForm'>
                <div style={{float:'left'}}>
                    <Label color='yellow' tag size='large'>
                        <div style={{color:'black'}}>
                            {highlight?.quote}
                        </div>
                    </Label>
                </div>
                <CommentList quote={highlight?.quote} posts={posts} setPosts={setPosts} />
                <CommentForm />
            </div>
            <div className='buttonBack'>
                <Button >
                    <Link to={'/'}>
                    <div style={{color:'black'}}>
                        Back
                    </div>
                    </Link>               
                </Button>
            </div>
        </div>
    )
}

export default HighlightItem
