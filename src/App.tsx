import { useState, useEffect } from 'react'
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import { Header, Icon } from 'semantic-ui-react'
import HighlightItem from './components/HighlightItem'
import HighlightList from './components/HighlightList'
import { Highlight } from './utils/Types'
import { getHighlightsForUrl } from './utils/Firebase'

import 'semantic-ui-css/semantic.min.css'
import './App.css'

function App() {
    const [highlights, setHighlights] = useState<Highlight[]>([])
    const [url, setUrl] = useState("")

    useEffect(() => {
        async function getTabUrl() {
            if (chrome.tabs) {
                const tab = await chrome.tabs.query({
                    active: true,
                    currentWindow: true,
                })
                return tab[0]?.url || 'unknown'
            } else {
                return 'localhost'
            }
        }

        getTabUrl().then((url) => {
            setUrl(url)
            getHighlightsForUrl(url).then((highlights) => {
                setHighlights(
                    highlights.sort((a, b) => {
                        return (
                            b.upvotes - b.downvotes - (a.upvotes - a.downvotes)
                        )
                    }),
                )
            })
        })
    }, [])
   

    return (
        <div className="App">
            <Header
                style={{ width: '290px', paddingTop: '10px', color: 'green' }}
            >
                <Icon name="check" />
                CrossCheck
            </Header>
            <Router>
                <Routes>
                    <Route
                        index
                        element={
                            <HighlightList
                                highlights={highlights}
                                setHighlights={setHighlights}
                                url={url}
                            />
                        }
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
