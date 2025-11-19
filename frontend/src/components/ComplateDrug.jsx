import React, { useState } from 'react'
import TestHeader from '../components/HeaderTest'
import RequestButton from '../components/RequestButton'
import CompleteTitle from '../components/CompleteTitle'
import Persons from '../components/Person'
import Label from '../components/labelCard'
import InputText from '../components/InputText'
import InputNumber from '../components/InputNumberPhone'
import ChooseInsurance from '../components/ChooseInsurance'
import Symptoms from '../components/symptoms'
import { useNavigate } from "react-router-dom";
import LoaderProvider from './LoaderProvider'
import { motion } from "framer-motion"

const CompleteDrug = () => {
    const navigate = useNavigate()
    const [patientName, setPatientName] = useState("")
    const [nationalCode, setNationalCode] = useState("")

    const isPatientNameError = patientName.length > 0 && patientName.length < 5
    const isNationalCodeError = nationalCode.length > 0 && nationalCode.length < 10

    const isFormValid =
        !isPatientNameError &&
        !isNationalCodeError &&
        patientName.length >= 5 &&
        nationalCode.length === 10

    return (
        <LoaderProvider>
            <div className='w-[100%] mx-auto relative mb-30'>
                <TestHeader onClick={() => navigate('/Drugregistration')} title={'تکمیل درخواست'} />
                <CompleteTitle title={'دریافت خدمات'} />
                <Persons />

                <div className='w-[90%] mx-auto mt-8'>
                    <Label labelName={'نام و نام خانوادگی بیمار'} />
                    <InputText
                        placeholder={"مثال : اشکان حسنوندی"}
                        value={patientName}
                        onChange={setPatientName}
                        isValid={patientName.length >= 5}
                        hasError={isPatientNameError}
                    />
                    <motion.label
                        className='vazir-medium block text-xs'
                        initial={{ opacity: 0.3, x: 20 }}
                        animate={{
                            opacity: isPatientNameError ? 1 : 0,
                            x: isPatientNameError ? 0 : 20,
                            color: isPatientNameError ? "#EF4444" : "#9CA3AF"
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        نام و نام خانوادگی باید حداقل ۵ کاراکتر باشد
                    </motion.label>
                </div>

                <div className='w-[90%] mx-auto'>
                    <Label labelName={'کد ملی '} />
                    <div className='mt-2'>
                        <InputNumber
                            placeholder={"مثال : 1234567890"}
                            value={nationalCode}
                            onChange={setNationalCode}
                            maxLength={10}
                            isValid={nationalCode.length === 10}
                            hasError={isNationalCodeError}
                        />
                    </div>
                    <motion.label
                        className='vazir-medium block text-xs my-2'
                        initial={{ opacity: 0.3, x: 20 }}
                        animate={{
                            opacity: isNationalCodeError ? 1 : 0,
                            x: isNationalCodeError ? 0 : 20,
                            color: isNationalCodeError ? "#EF4444" : "#9CA3AF"
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        کد ملی باید ۱۰ رقم باشد
                    </motion.label>
                </div>

                <ChooseInsurance />
                <Symptoms />

                <div className='w-[90%] mx-auto mt-6'>
                    <RequestButton
                        onClick={() => isFormValid && navigate('/CompletingthedrugRequest')}
                        bg={isFormValid ? "bg-blue-500" : "bg-gray-200"}
                        color={isFormValid ? "text-white" : "text-gray-500"}
                        text="تکمیل سفارش"
                    />
                </div>
            </div>
        </LoaderProvider>
    )
}

export default CompleteDrug
