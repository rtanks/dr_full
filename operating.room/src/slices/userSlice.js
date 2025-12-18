import { createSlice } from "@reduxjs/toolkit";

export const PatientsSlice = createSlice({
    name: 'patients',
    initialState: {
        patients: [],
        patientsMain: [],
    },
    reducers: {
        getPatients: (state, action) => {
            state.patients = action.payload.patients;
        },
        getPatientsMain: (state, action) => {
            state.patientsMain = action.payload.patients;
        },
        filterPatients: (state, action) => {
            state.patients = action.payload.patients;
        }
    }
})

export const { getPatients, filterPatients, getPatientsMain } = PatientsSlice.actions;

export default PatientsSlice.reducer;