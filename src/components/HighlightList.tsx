import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Highlight } from 'utils/Types'

function HighlightList({ highlights }: { highlights: Highlight[] }) {
    const [showMore, setShowMore] = useState(false)

    return (
        <div>
            {highlights
                .map((highlight) => (
                    <div>
                        <Link to={`/${highlight.id}`}>{highlight.quote}</Link>
                    </div>
                ))
                .filter((o: any, k: number) => k < 3 || showMore)}
            <button type="button" onClick={() => setShowMore(!showMore)}>
                {!showMore ? 'More' : 'Less'}{' '}
            </button>
        </div>
    )
}

export default HighlightList
