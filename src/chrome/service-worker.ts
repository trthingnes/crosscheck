import {
  SELECTION_SUBMIT_CONTEXT_MENU_MESSAGE,
  SELECTION_SUBMIT_SUCCESS_NOTIFICATION_MESSAGE,
  SELECTION_SUBMIT_SUCCESS_NOTIFICATION_TITLE,
} from "Constants"

const contextMenuId = "selection-submit"
const contextMenuContexts: chrome.contextMenus.ContextType[] = ["selection"]

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: SELECTION_SUBMIT_CONTEXT_MENU_MESSAGE,
    contexts: contextMenuContexts,
    id: contextMenuId,
  })
})

chrome.contextMenus.onClicked.addListener(handleContextMenuClick)

function handleContextMenuClick(data: chrome.contextMenus.OnClickData) {
  if (data.menuItemId === contextMenuId) {
    const url = data.frameUrl
    const selection = data.selectionText

    // TODO: Do something with url and selection here, and give the user a success/failure notification.
    console.log(url, selection)

    // ! Opening the extension popup is not possible programatically. It seems like Google designed it that way.
    chrome.notifications.create({
      type: "basic",
      iconUrl: "../../icons/icon128.png",
      title: SELECTION_SUBMIT_SUCCESS_NOTIFICATION_TITLE,
      message: SELECTION_SUBMIT_SUCCESS_NOTIFICATION_MESSAGE,
    })
  }
}

export {}
