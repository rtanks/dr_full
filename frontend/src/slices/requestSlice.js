import {createSlice} from '@reduxjs/toolkit';
const getValuesLocal = () => {
    const data = localStorage.getItem('order');
    if(data) {
        const dataParse = JSON.parse(data);
        return dataParse;
    } else {
        const initData = {
            service: '',
            fullName: '',
            nationalCode: '',
            phoneNumber: '',
            insurance:'آزاد',
            province: '',
            city: '',
            explain: '',
            center:''
        }
        return initData;
    }
}
const initialState = getValuesLocal();

export const RequestSlice = createSlice({
    name: 'request',
    initialState: initialState,
    reducers: {
        getServiceAndTitle: (state, action) => {
            state.service = action.payload.service;
            localStorage.setItem('order', JSON.stringify(state))
        },
        getInfo: (state, action) => {
            state.fullName = action.payload.fullName;
            state.nationalCode = action.payload.nationalCode;
            state.phoneNumber = action.payload.phoneNumber;
            localStorage.setItem('order', JSON.stringify(state))
        },
        getInfoStep2: (state, action) => {
            state.step2 = action.payload;
            localStorage.setItem('order', JSON.stringify(state))
        },
        completeOrder: (state) => {
            state = initialState;
            localStorage.removeItem('order')
        }
    }
}) 

export const {getInfo, getInfoStep2, getServiceAndTitle, completeOrder} = RequestSlice.actions;

export default RequestSlice.reducer;