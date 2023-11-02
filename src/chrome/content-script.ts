import { Highlight } from "Types"

// TODO: Replace this example from https://www.bbc.com/news/business-67294106
// Retrieve highlights for the given page
const highlights: Highlight[] = [
  {
    quote:
      "The company's lawyer said they denied negligence and the firm was considering whether to appeal.",
    vote_score: 10,
    comment_count: 3,
  },
  {
    quote: "Both substances can be used as additives to solvents.",
    vote_score: 15,
    comment_count: 7,
  },
]

// Replace all exact quote with highlighted versions
let html = document.body.innerHTML

highlights.forEach((it) => {
  html = html.replaceAll(
    it.quote,
    `<span title="This quote has ${it.vote_score} score and ${it.comment_count} comments on CrossCheck." class="crosscheck-highlighted-text">
        ${it.quote}
    </span>`
  )
})

document.body.innerHTML = html

export {}
