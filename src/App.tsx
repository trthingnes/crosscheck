import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import { Grid, Header, Icon } from 'semantic-ui-react'

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
                style={{ margin: '1rem 0 0 0' }}
            >
                <Icon name="check" />
                CrossCheck
            </Header>
            <Grid padded>
                <Router>
                    <Routes>
                        <Route index element={<HighlightsPage />}></Route>
                        <Route path="/:id" element={<PostsPage />}></Route>
                    </Routes>
                </Router>
            </Grid>
        </div>
    )
}

export default App
