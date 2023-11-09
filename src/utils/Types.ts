import { Timestamp } from 'firebase/firestore'

export type Highlight = {
    id?: string
    url: string
    quote: string
    upvotes: number
    downvotes: number
    timestamp: Timestamp
}

export type Post = {
    id?: string
    highlight: Highlight
    comment: string
    sources: string[]
    upvotes: number
    downvotes: number
    timestamp: Timestamp
}

export type Vote = {
    id: string
    type: VoteType
}

export enum VoteType {
    'Upvote',
    'Downvote',
}
