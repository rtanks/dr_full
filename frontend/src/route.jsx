import {BrowserRouter, Routes, Route} from 'react-router-dom'
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

import Success from './page/payment/Success'
import Failed from './page/payment/Failed'
import Verify from './page/payment/verify'
import About from './page/About'
import Support from './page/Support'
import MessageBox from './page/MessageBox'
import Request from './page/Request'
import VisitDoctor from './page/VisitDoctor'
import ForTestComponent from './page/ForTestComponent'
import ProtectedRoute from './ProtectedRoute'
import LoginOwner from './page/LoginOwner'
import Profile from './page/Profile'
import { useRef } from 'react'
import Triage from './page/Triage'

export default function RoutesList() {
    const targetElement = useRef();
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<LoginOwner/>}/>
                <Route path='for-test' element={<ForTestComponent/>}/>
                <Route path='*' element={<NoPage/>}/>
                <Route path='/:reagent?' element={<MainPage/>}>
                    {/* <Route index element={<Navigate to={'mri'} replace/>}/> */}
                    {/* <Route index element={<Home/>}/> */}
                    <Route path='triage' element={<Triage/>}/>
                    <Route path='visit-doctor' element={<VisitDoctor/>}/>
                    <Route path='mri' index element={<MRI/>}/>
                    <Route path='graph' element={<Graph/>}/>
                    <Route path='ultrasound' element={<Ultrasound/>}/>
                    <Route path='medicine' element={<Medicine/>}/>
                    <Route path='ct-scan' element={<CtScan/>}/>
                    <Route path='strip-test' element={<StripTest/>}/>
                    <Route path='test' element={<Test/>}/>
                    <Route path='physiotherapy' element={<Physiotherapy/>}/>
                    <Route path='transport' element={<Transport/>}/>
                    <Route path='about' element={<About/>}/>
                    <Route index element={<Support/>}/>
                    <Route path='support' element={<Support/>}/>
                    <Route path='message-box' element={<MessageBox/>}/>
                    <Route path='request/:id?' element={<ProtectedRoute><Request/></ProtectedRoute>}/>
                    <Route path='profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                </Route>
                <Route path='/payment/success' element={<Success/>}/>
                <Route path='/payment/failed' element={<Failed/>}/>
                <Route path='/payment/verify' element={<Verify/>}/>
            </Routes>
        </BrowserRouter>
    )
}