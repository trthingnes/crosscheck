import { CONTEXT_MENU_TEXT } from "Constants"

const CONTEXT_MENU_ID: string = "submit-selection"
const CONTEXT_MENU_CONTEXTS: chrome.contextMenus.ContextType[] = ["selection"]

chrome.contextMenus.onClicked.addListener(handleContextMenuClick)

function handleContextMenuClick(info: chrome.contextMenus.OnClickData) {
  if (info.menuItemId === CONTEXT_MENU_ID) {
    console.info("The context menu has been clicked")
  }
}

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: CONTEXT_MENU_TEXT,
    contexts: CONTEXT_MENU_CONTEXTS,
    id: CONTEXT_MENU_ID,
  })
})

export {}
