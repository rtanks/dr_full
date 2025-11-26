import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import MainPage from './page/MainPage'
import NoPage from './page/NoPage'

import Test from './page/Test'
import Medicine from './page/Medicine'
import Ultrasound from './page/Ultrasound'
import Transport from './page/Transport'
import StripTest from './page/StripTest'
import MRI from './page/MRI'
import Physiotherapy from './page/Physiotherapy'
import Graph from './page/Graph'
import CtScan from './page/CtScan'
import QrCode from './page/QrCode'

import Success from './page/payment/Success'
import Failed from './page/payment/Failed'

export default function RoutesList() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='*' element={<NoPage/>}/>
                <Route path='/:reagent?' element={<MainPage/>}>
                    <Route index element={<Navigate to={'mri'} replace/>}/>
                    <Route path='mri' index element={<MRI/>}/>
                    <Route path='graph' element={<Graph/>}/>
                    <Route path='ultrasound' element={<Ultrasound/>}/>
                    <Route path='medicine' element={<Medicine/>}/>
                    <Route path='ct-scan' element={<CtScan/>}/>
                    <Route path='strip-test' element={<StripTest/>}/>
                    <Route path='test' element={<Test/>}/>
                    <Route path='physiotherapy' element={<Physiotherapy/>}/>
                    <Route path='transport' element={<Transport/>}/>
                    <Route path='qrcode' element={<QrCode/>}/>
                </Route>
                <Route path='/payment/success' element={<Success/>}/>
                <Route path='/payment/failed' element={<Failed/>}/>
                
            </Routes>
        </BrowserRouter>
    )
}