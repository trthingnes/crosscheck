import { Timestamp } from 'firebase/firestore'
import { HIGHLIGHT_MIN_SIZE } from '../utils/Constants'
import { addHighlight, getHighlightsForUrl } from '../utils/Firebase'
import { Message, MessageType } from '../utils/Types'

const contextMenuId = 'selection-submit'
const contextMenuTitle = 'Submit highlighted text for discussion'
const contextMenuContexts: chrome.contextMenus.ContextType[] = ['selection']

// Initial setup when the extension is first installed
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        id: contextMenuId,
        title: contextMenuTitle,
        contexts: contextMenuContexts,
    })
})

// Handle context menu clicks by the user
chrome.contextMenus.onClicked.addListener(function (
    data: chrome.contextMenus.OnClickData,
) {
    if (data.menuItemId === contextMenuId) {
        const url = data.frameUrl
        const selection = data.selectionText

        if (!url) {
            chrome.notifications.create({
                type: 'basic',
                iconUrl: '../../icons/icon128.png',
                title: 'Could not submit selection for discussion',
                message:
                    'We could not read the URL of the website you are visiting right now. Please reload and try again.',
            })
        } else if (!selection || selection.length < HIGHLIGHT_MIN_SIZE) {
            chrome.notifications.create({
                type: 'basic',
                iconUrl: '../../icons/icon128.png',
                title: 'Could not submit selection for discussion',
                message: `We could not submit your current selection, please make sure you have marked more than ${HIGHLIGHT_MIN_SIZE} characters.`,
            })
        } else {
            addHighlight({
                url: url,
                quote: selection,
                upvotes: 0,
                downvotes: 0,
                timestamp: Timestamp.now(),
            })

            // ! Opening the extension popup is not possible programatically. It seems like Google designed it that way.
            chrome.notifications.create({
                type: 'basic',
                iconUrl: '../../icons/icon128.png',
                title: 'Selection submitted for discussion',
                message:
                    'Your submission should be visible in the extension window in the top right corner of the browser.',
            })
        }
    }
})

// Handle messages from other parts of the Chrome extension (popup and content script)
chrome.runtime.onMessage.addListener(function (
    message: Message,
    _sender,
    sendResponse,
) {
    switch (message.type) {
        case MessageType.GetHighlights:
            const url = message.content as string
            getHighlightsForUrl(url).then((highlights) => {
                console.log('Fetched highlights', highlights)
                sendResponse(highlights)
            })
    }
    return true
})

export {}
