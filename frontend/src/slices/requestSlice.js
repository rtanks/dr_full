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
            birthday: '',
            address: '',
            location: null,//{lat,lng}
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
            // localStorage.setItem('order', JSON.stringify(state))
        },
        getInfo: (state, action) => {
            state.fullName = action.payload.fullName;
            state.nationalCode = action.payload.nationalCode;
            state.phoneNumber = action.payload.phoneNumber;
            state.birthday = action.payload.birthday;
            state.city = action.payload.city;
            state.province = action.payload.province;
            state.location = action.payload.location;
            state.address = action.payload.address;
        },
        getInfoStep2: (state, action) => {
            state.step2 = action.payload;
        },
        completeOrder: (state) => {
            state = initialState;
        }
    }
}) 

export const {getInfo, getInfoStep2, getServiceAndTitle, completeOrder} = RequestSlice.actions;

export default RequestSlice.reducer;