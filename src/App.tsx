import 'semantic-ui-css/semantic.min.css'
import './App.css'
import { useState, useEffect } from 'react'
import HighlightItem from './components/HighlightItem'
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import HighlightList from './components/HighlightList'
import { getHighlights, getHighlightsForUrl } from './utils/Firebase'
import { Highlight } from './utils/Types'
import {Header, Icon} from 'semantic-ui-react'


function App() {
    const [highlights, setHighlights] = useState<Highlight[]>([])

    useEffect(() => {
        getHighlights().then((highlights) => {
            setHighlights(highlights)
        })
    }, [])
   

    return (
        <div className="App">
            <Header style={{"width":"300px", "paddingTop":"10px", "color":"green"}}>
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
