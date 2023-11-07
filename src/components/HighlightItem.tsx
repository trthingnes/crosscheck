import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Highlight, Post } from '../utils/Types'
import { getPostsByHighlight } from '../utils/Firebase'
import HighlightQuote from './HighlightQuote'
import { CommentGroup } from 'semantic-ui-react'
import CommentList from './CommentList'

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
        <div>
            <CommentList posts={posts} setPosts={setPosts} />
            
            <Link to={'/'}>Back</Link>
        </div>
    )
}

export default HighlightItem
