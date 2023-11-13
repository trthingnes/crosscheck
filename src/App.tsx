import { useState } from 'react'
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import { Grid, Header, Icon, Segment } from 'semantic-ui-react'

import { HighlightsPage } from './routes/HighlightsPage'
import { PostsPage } from './routes/PostsPage'
import { getTotalLast7Days } from './utils/Firebase'

import 'semantic-ui-css/semantic.min.css'
import { LOCALSTORAGE_CONTRIBUTIONS_KEY } from './utils/Constants'

function App() {
    const usersContributions =
        localStorage.getItem(LOCALSTORAGE_CONTRIBUTIONS_KEY) || '0'
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
                style={{ margin: '1rem 0 1rem 0' }}
            >
                <Icon name="check" />
                CrossCheck
            </Header>
            <Grid>
                <Grid.Row centered>
                    <Segment size="tiny">
                        You have contributed {usersContributions} out of{' '}
                        {totalContributions} total items in the last 7 days
                    </Segment>
                </Grid.Row>
            </Grid>
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
