export type Highlight = {
    id?: string
    url: string
    quote: string
    upvotes: number
    downvotes: number
}

export type Post = {
    id?: string
    highlight: any
    comment: string
    sources: string[]
    upvotes: number
    downvotes: number
}


