import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Highlight } from 'utils/Types'

function HighlightItem({ highlights }: { highlights: Highlight[] }) {
    const { id } = useParams()
    const [highlight, setHighlight] = useState<Highlight>()

    useEffect(() => {
        setHighlight(highlights.find((i: Highlight) => i.id === id))
    }, [highlights, id])

    return (
        <div>
            <div>{JSON.stringify(highlight)}</div>
            <Link to={'/'}>Back</Link>
        </div>
    )
}

export default HighlightItem
