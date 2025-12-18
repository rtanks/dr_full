import {createSlice} from '@reduxjs/toolkit';
const getValuesLocal = () => {
    const data = localStorage.getItem('order');
    if(data) {
        const dataParse = JSON.parse(data);
        return dataParse;
    } else {
        const initData = {
            fullName: '',
            nationalCode: '',
            phoneNumber: '',
            service: '',
            insurance:'',
            // province: '',
            // city: '',
            explain: '',
            area: [],
            date: '',
            time: ''
        }
        return initData;
    }
}
const initialState = getValuesLocal();

export const RequestSlice = createSlice({
    name: 'request',
    initialState: {
            fullName: '',
            nationalCode: '',
            phoneNumber: '',
            service: '',
            insurance:'',
            // province: '',
            // city: '',
            explain: '',
            area: [],
            date: '',
            time: ''
        },
    reducers: {
        getServiceAndTitle: (state, action) => {
            state.service = action.payload.service;
            // localStorage.setItem('order', JSON.stringify(state))
        },
        getInfo: (state, action) => {
            state.fullName = action.payload.fullName;
            state.nationalCode = action.payload.nationalCode;
            state.phoneNumber = action.payload.phoneNumber;
        },
        getAllInfo: (state, action) => {
            console.log('requestSlice',action.payload)
            state = {...action.payload};
        },
        getInfoStep2: (state, action) => {
            state.step2 = action.payload;
        },
        completeOrder: (state) => {
            state = initialState;
        }
    }
}) 

export const {getAllInfo, getInfo, getInfoStep2, getServiceAndTitle, completeOrder} = RequestSlice.actions;

export default RequestSlice.reducer;