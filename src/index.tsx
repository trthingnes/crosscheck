import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <App />,
    /*
    ! Enabling strict mode caused a warning from a 3rd party library, so we have chosen to disable it
    <React.StrictMode>
        <App /> 
    </React.StrictMode>
    */
)
