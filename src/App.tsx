import { useState } from 'react'
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import { Header, Icon } from 'semantic-ui-react'

import { HighlightsPage } from './routes/HighlightsPage'
import { PostsPage } from './routes/PostsPage'
import { getTotalLast7Days } from './utils/Firebase'

import 'semantic-ui-css/semantic.min.css'

function App() {
    const [totalContributions, setTotalContributions] = useState(0)
    getTotalLast7Days().then((res) => {
        setTotalContributions(res)
    })

    return (
        <div className="App">
            <Header
                color="green"
                textAlign="center"
                size="medium"
                style={{ marginTop: '1rem' }}
            >
                <Icon name="check" />
                CrossCheck {totalContributions}
            </Header>
            <Router>
                <Routes>
                    <Route index element={<HighlightsPage />}></Route>
                    <Route path="/:id" element={<PostsPage />}></Route>
                </Routes>
            </Router>
        </div>
    )
}

export default App
