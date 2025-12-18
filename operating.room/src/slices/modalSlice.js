import { createSlice } from "@reduxjs/toolkit";


export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        showItem: '', 
    },
    reducers: {
        getShowModal: (state, action) => {
            state.showItem = action.payload.item;
        },
        closeModal: (state) => {
            state.showItem = '';
        }
    }
})

export const { getShowModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;