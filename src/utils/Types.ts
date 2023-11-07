export type Highlight = {
    id?: string
    url: string
    quote: string
    upvotes: number
    downvotes: number
}

export type Post = {
    id?: string
    highlight: Highlight
    comment: string
    sources: string[]
    upvotes: number
    downvotes: number
}
