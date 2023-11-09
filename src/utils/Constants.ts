import { Timestamp } from 'firebase/firestore'
import { Highlight, Post } from './Types'

/**
 * Is the extension running in development mode (should we assume we are running in a browser window)?
 */
export const IS_DEV =
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export const OFFLINE_MODE = IS_DEV

export const SAMPLE_HIGHLIGHT: Highlight = {
    id: 'sample-highlight',
    url: 'localhost',
    quote: 'This is an example quote',
    upvotes: 10,
    downvotes: 2,
    timestamp: Timestamp.now(),
}

export const SAMPLE_POST: Post = {
    id: 'sample-post',
    highlight: SAMPLE_HIGHLIGHT,
    comment: 'This is an example comment',
    sources: ['http://example.com', 'http://example.com/page/page/page'],
    upvotes: 5,
    downvotes: 1,
    timestamp: Timestamp.now(),
}

export const DEFAULT_SHOW_COUNT = 3
export const HIGHLIGHT_MIN_SIZE = 5
