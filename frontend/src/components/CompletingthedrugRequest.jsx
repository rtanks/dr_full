import React, { useState, useRef, useEffect } from 'react'
import TestHeader from '../components/HeaderTest'
import RequestButton from '../components/RequestButton'
import CompleteTitle from '../components/CompleteTitle'
import YesNo from '../components/YesOrNo'
import MessageDrug from '../components/Drugmessage'
import LocationUser from '../components/LocationUser'
import { useNavigate } from "react-router-dom";
import LoaderProvider from './LoaderProvider'

const CompletingthedrugRequest = () => {
    const navigate = useNavigate()
    const [needService, setNeedService] = useState("") 
    const [userLocation, setUserLocation] = useState('')
    const locationRef = useRef(null)

    const isButtonActive =
        (needService === "no") ||
        (needService === "yes" && userLocation)

    useEffect(() => {
        if (needService === "yes" && locationRef.current) {
            locationRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [needService])

    return (
        <LoaderProvider>
            <div className='w-[100%] mx-auto relative'>
                <TestHeader onClick={() => navigate('/CompletDrug')} title={'تکمیل درخواست'} />

                <CompleteTitle title={'به خدمات خرید و ارسال دارو نیاز دارید ؟'} />

                <YesNo active={needService} onChange={setNeedService} />

                <MessageDrug />

                <div ref={locationRef}>
                    <LocationUser onSelect={setUserLocation} />
                </div>

                <RequestButton
                    onClick={() => {
                        if (isButtonActive) navigate('/paymentDrug')
                    }}
                    bg={isButtonActive ? 'bg-blue-500' : 'bg-gray-300'}
                    color={isButtonActive ? 'text-white' : 'text-gray-500'}
                    text={'تکمیل سفارش'}
                />
            </div>
        </LoaderProvider>
    )
}

export default CompletingthedrugRequest
