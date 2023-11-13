import { Highlight, MessageType } from '../utils/Types'
;(async () => {
    const url = window.location.href

    const highlights = (await chrome.runtime.sendMessage({
        type: MessageType.GetHighlights,
        content: url,
    })) as Highlight[]

    // Replace all exact quote with highlighted versions
    let html = document.body.innerHTML

    highlights.forEach((it) => {
        html = html.replaceAll(
            it.quote,
            `<span title="This quote has ${
                it.upvotes - it.downvotes
            } score on CrossCheck." class="crosscheck-highlighted-text">${
                it.quote
            }</span>`,
        )
    })

    document.body.innerHTML = html
})()

export {}
