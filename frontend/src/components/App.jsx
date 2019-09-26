import React from 'react';
import {Provider} from "react-redux";
import {BrowserRouter} from 'react-router-dom';
import Splash from './splash';


const App = props => {
    return (
        <Provider store={props.store}>
            <BrowserRouter>
                <Splash/>
            </BrowserRouter>
        </Provider>
    )
}

export default App
