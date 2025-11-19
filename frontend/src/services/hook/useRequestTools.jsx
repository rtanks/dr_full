import { useDispatch } from 'react-redux'
import { getInfo, getInfoStep2, getServiceAndTitle } from '../../slices/requestSlice'
import { useEffect } from 'react';

export default function useRequestTools() {
    const dispatch = useDispatch()

    const getDataFromStepOne = (data) => {
        dispatch(getInfo(data));
    }

    const getDataFromStepTwo = (data) => {
        dispatch(getInfoStep2(data));
    }

    const getTitleAndServiceRequest = (service, title) => {
        dispatch(getServiceAndTitle({service: service, title: title}))
    }

    return {getDataFromStepOne, getDataFromStepTwo, getTitleAndServiceRequest}
}