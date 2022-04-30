import { Route, Routes } from 'react-router-dom'
import { Html } from './html'

import './style.css'



export function App(){
    return (
        <Routes>
            <Route path='/todoLIst' element={<Html />} />
        </Routes>
    )
}