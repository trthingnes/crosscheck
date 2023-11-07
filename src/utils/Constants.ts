import { Highlight, Post } from './Types'

/**
 * Is the extension running in development mode (should we assume we are running in a browser window)?
 */
export const IS_DEV =
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export const OFFLINE_MODE = IS_DEV

export const SAMPLE_HIGHLIGHT: Highlight = {
    url: 'localhost',
    quote: 'This is an example quote',
    upvotes: 10,
    downvotes: 2,
}

export const SAMPLE_POST: Post = {
    highlight: SAMPLE_HIGHLIGHT,
    comment: 'This is an example comment',
    sources: ['http://example.com'],
    upvotes: 5,
    downvotes: 1,
}

export const SELECTION_SUBMIT_CONTEXT_MENU_MESSAGE =
    'Submit highlighted text for discussion'
export const SELECTION_SUBMIT_SUCCESS_NOTIFICATION_TITLE =
    'Selection submitted for discussion'
export const SELECTION_SUBMIT_SUCCESS_NOTIFICATION_MESSAGE =
    'Your submission should be visible in the extension window in the top right corner of the browser.'
