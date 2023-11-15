import { getHighlightsForUrl } from '../utils/Firebase'

const url = window.location.href

getHighlightsForUrl(url).then((highlights) => {
    if (highlights.length === 0) return

    // Replace all exact quote with highlighted versions
    let html = document.body.innerHTML
    highlights.forEach((it) => {
        const score = it.upvotes - it.downvotes

        if (score < 0) return

        const opacity = Math.min(1.0, (score + 2) / 10)
        const color = `rgba(218, 165, 32, ${opacity})`

        html = html.replaceAll(
            it.quote,
            `<span style="background-color: ${color}" title="This quote has ${
                it.upvotes - it.downvotes
            } score on CrossCheck." class="crosscheck-highlighted-text">
        ${it.quote}</span>`,
        )
    })
    document.body.innerHTML = html
})

export {}
