import { createSlice } from "@reduxjs/toolkit";

export const patientActionSlice = createSlice({
    name: 'patientAction',
    initialState: {
        id: '',
        fullName: '',
        phoneNumber: '',
        nationalCode: ''
    },
    reducers: {
        getPatientInfo: (state, action) => {
            console.log(action.payload.patient)
            state.id= action.payload.patient.id;
            state.fullName= action.payload.patient.fullName;
            state.phoneNumber= action.payload.patient.phoneNumber;
            state.nationalCode= action.payload.patient.nationalCode;
        },

    }
})
export const {getPatientInfo} = patientActionSlice.actions;
export default patientActionSlice.reducer;