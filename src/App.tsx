import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import { Header, Icon } from 'semantic-ui-react'
import { HighlightsPage } from './routes/HighlightsPage'
import { PostsPage } from './routes/PostsPage'

import 'semantic-ui-css/semantic.min.css'

function App() {
    return (
        <div className="App">
            <Header
                color="green"
                textAlign="center"
                size="medium"
                style={{ marginTop: '1rem' }}
            >
                <Icon name="check" />
                CrossCheck
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
