import { HIGHLIGHT_MIN_SIZE } from '../utils/Constants'
import { addHighlight } from '../utils/Firebase'

const contextMenuId = 'selection-submit'
const contextMenuTitle = 'Submit highlighted text for discussion'
const contextMenuContexts: chrome.contextMenus.ContextType[] = ['selection']

chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        id: contextMenuId,
        title: contextMenuTitle,
        contexts: contextMenuContexts,
    })
})

chrome.contextMenus.onClicked.addListener(handleContextMenuClick)

function handleContextMenuClick(data: chrome.contextMenus.OnClickData) {
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
                timestamp: new Date(),
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
}

export {}
