import { CONTEXT_MENU_TEXT } from "Constants"

const CONTEXT_MENU_ID = "selection-submit"
const CONTEXT_MENU_CONTEXTS: chrome.contextMenus.ContextType[] = ["selection"]

chrome.contextMenus.onClicked.addListener(handleContextMenuClick)

function handleContextMenuClick(data: chrome.contextMenus.OnClickData) {
  if (data.menuItemId === CONTEXT_MENU_ID) {
    chrome.runtime.sendMessage(data.selectionText)
  }
}

// TODO: Receiving end does not exist?
// https://stackoverflow.com/questions/54181734/chrome-extension-message-passing-unchecked-runtime-lasterror-could-not-establi/54686484#54686484
chrome.runtime.onConnect.addListener(() => {
  chrome.runtime.onMessage.addListener((selection: string) => {
    console.info("Received message", selection)
  })
})

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: CONTEXT_MENU_TEXT,
    contexts: CONTEXT_MENU_CONTEXTS,
    id: CONTEXT_MENU_ID,
  })
})

export {}
