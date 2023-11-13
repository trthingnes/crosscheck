import { getHighlightsForUrl } from '../utils/Firebase'

const url = window.location.href

getHighlightsForUrl(url).then((highlights) => {
    if (highlights.length === 0) return

    // Replace all exact quote with highlighted versions
    let html = document.body.innerHTML
    highlights.forEach((it) => {
        html = html.replaceAll(
            it.quote,
            `<span title="This quote has ${
                it.upvotes - it.downvotes
            } score on CrossCheck." class="crosscheck-highlighted-text">
        ${it.quote}
    </span>`,
        )
    })
    document.body.innerHTML = html
})

export {}
