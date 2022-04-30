import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './app'
import { BrowserRouter } from 'react-router-dom';



    const know = document.getElementById('root')
        ReactDOM.render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        ,know
    )

    
