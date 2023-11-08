import { Button } from 'semantic-ui-react'

export function ShowMoreLessButtons({
    showCount,
    setShowCount,
    min,
    step,
    max,
}: {
    showCount: number
    setShowCount: (n: number) => void
    min: number
    step: number
    max: number
}) {
    return (
        <Button.Group>
            <Button
                color="green"
                disabled={showCount >= max}
                onClick={() => setShowCount(Math.min(max, showCount + step))}
            >
                Show more
            </Button>
            <Button
                color="red"
                disabled={showCount <= min}
                onClick={() => setShowCount(Math.max(min, showCount - step))}
            >
                Show less
            </Button>
        </Button.Group>
    )
}
