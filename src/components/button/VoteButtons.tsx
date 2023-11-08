import { createContext, useContext } from 'react'
import { Vote, VoteType } from '../../utils/Types'
import { Button, Icon, Label } from 'semantic-ui-react'

export const VotingContext = createContext<[Vote[], (v: Vote[]) => void]>([
    [],
    () => {},
])

export function VoteButtons({
    documentId,
    documentUpvotes,
    documentDownvotes,
}: {
    documentId: string
    documentUpvotes: number
    documentDownvotes: number
}) {
    const [votes, setVotes] = useContext(VotingContext)

    function changeVote(upvote: boolean) {
        const changeFrom = upvote ? VoteType.Downvote : VoteType.Upvote
        const changeTo = upvote ? VoteType.Upvote : VoteType.Downvote

        let newVotes = votes.slice()
        let index = newVotes.findIndex((v) => v.id === documentId)

        if (index !== -1 && newVotes[index]?.type === changeFrom) {
            newVotes.splice(index, 1)
        } else {
            newVotes.push({
                id: documentId,
                type: changeTo,
            })
        }

        setVotes(newVotes)
    }

    return (
        <div>
            <Button
                icon
                color="green"
                size="tiny"
                disabled={
                    votes.find((v) => v.id === documentId)?.type ===
                    VoteType.Upvote
                }
                onClick={() => changeVote(true)}
            >
                <Icon name="arrow up" />
            </Button>

            <Label>{documentUpvotes - documentDownvotes}</Label>

            <Button
                icon
                color="red"
                size="tiny"
                disabled={
                    votes.find((v) => v.id === documentId)?.type ===
                    VoteType.Downvote
                }
                onClick={() => changeVote(false)}
            >
                <Icon name="arrow down" />
            </Button>
        </div>
    )
}
