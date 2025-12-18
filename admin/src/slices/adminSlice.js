import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
    name: "admin",
    initialState: {
        userAdmin: {
            id: null,
            role: null,
            phoneNumber: null
        },
        patients: [],
        doctors: [],
        withdrawals: [],
    },
    reducers: {
        getUserAdmin: (state, action) => {
            state.userAdmin = action.payload.user;
        },
        getPatients: (state, action) => {
            state.patients = action.payload.patients;
        },
        getDoctors: (state, action) => {
            state.doctors = action.payload.doctors;
        },
        getWithdrawals: (state, action) => {
            state.withdrawals = action.payload.withdrawals;
        }
    }
})

export const {getUserAdmin, getPatients, getDoctors, getWithdrawals} = adminSlice.actions;

export default adminSlice.reducer;