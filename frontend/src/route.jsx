import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Reagent from './page/reagent/Reagent'
import LoginReagent from './page/reagent/LoginReagent'
import MainPage from './page/MainPage'
import ReagentQrcode from './page/reagent/ReagentQrcode'
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
                </Route>
                {/* reagent */}
                <Route element={<Reagent/>}>
                    <Route path='reagent/qrcode' element={<ReagentQrcode/>}/>
                    <Route path='/reagent/login' element={<LoginReagent/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}