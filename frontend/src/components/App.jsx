import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import Splash from './splash'

const App = props => {
    return (
        <div>
            <BrowserRouter>
                <Splash/>
            </BrowserRouter>
        </div>
    )
}

export default App