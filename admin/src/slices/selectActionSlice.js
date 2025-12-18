import { createSlice } from "@reduxjs/toolkit";

export const selectActionSlice = createSlice({
    name: "selectAction",
    initialState: {
        showNavbar: true, 
    }, 
    reducers: {
        changeShowNavbarStatus: (state, action) =>{
            state.showNavbar = action.payload.show;
        }
    }
})

export const {changeShowNavbarStatus} = selectActionSlice.actions

export default selectActionSlice.reducer