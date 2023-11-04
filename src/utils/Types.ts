export type Highlight = {
    id?: string
    url: string
    quote: string
    upvotes: number
    downvotes: number
}

export type Post = {
    id?: string
    comment: string
    sources: string[]
    upvotes: number
    downvotes: number
}
