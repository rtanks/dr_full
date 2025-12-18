import { createSlice } from "@reduxjs/toolkit";

export const statusMenuSlice = createSlice({
    name: "statusMenu",
    initialState: {
        toggle: false
    },
    reducers: {
        changeToggleMenuStatus: (state) => {
            state.toggle = !state.toggle
        },
    }
})

export const {changeToggleMenuStatus} = statusMenuSlice.actions;

export default statusMenuSlice.reducer;