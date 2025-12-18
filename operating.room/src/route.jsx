import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from './page/Home'
import Login from './page/Login'


export default function RoutesList() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login/>}/>
                <Route path='dr' element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}