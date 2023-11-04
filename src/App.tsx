import 'semantic-ui-css/semantic.min.css'
import './App.css'
import { useState, useEffect } from 'react'
import HighlightItem from 'components/HighlightItem'
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import HighlightList from 'components/HighlightList'
import { getHighlightsForUrl, updateHighlight } from 'utils/Firebase'
import { Highlight } from 'utils/Types'

function App() {
    const [highlights, setHighlights] = useState<Highlight[]>([])

    useEffect(() => {
       chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                // There should only be a single tab in this query, so select tabs[0]
                getHighlightsForUrl(tabs[0].url).then((highlights) => {
                    setHighlights(
                        highlights.sort((a, b) => {
                            return (
                                b.upvotes -
                                b.downvotes -
                                (a.upvotes - a.downvotes)
                            )
                        }),
                    )
                })
                },
        )
    }, [])

    const voteHighlight = (highlight: Highlight, upvote: boolean) => {
      upvote ? highlight.upvotes++ : highlight.downvotes++
      updateHighlight(highlight).then( () => {
      const newHighlights = highlights.map((i) => {
          if (i.id === highlight.id){
            return highlight
          }
          return i
        })
        setHighlights(newHighlights)
    })
    }

    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route
                        index
                        element={<HighlightList highlights={highlights} voteHighlight={voteHighlight} />}
                    ></Route>
                    <Route
                        path="/:id"
                        element={<HighlightItem highlights={highlights} />}
                    ></Route>
                </Routes>
            </Router>
        </div>
    )
}

export default App
