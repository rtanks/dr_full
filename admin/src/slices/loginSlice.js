import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: "loginInfo",
    initialState: {
        id: "",
        role: "",
        fullName: "",
        phoneNumber: "",
        nationalCode: "",
        slug: ""
    }, 
    reducers: {
        getInformationUser: (state,action) => { 
            console.log(action.payload.user);
            state.id = action.payload.user.id;
            state.role = action.payload.user.role;
            state.fullName = action.payload.user.fullName;
            state.phoneNumber = action.payload.user.phoneNumber;
            state.nationalCode = action.payload.user.nationalCode;
            state.slug = action.payload.user.slug;
        }
    }
})

export const {getInformationUser} = loginSlice.actions

export default loginSlice.reducer;