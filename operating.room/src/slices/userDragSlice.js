import { createSlice } from "@reduxjs/toolkit";
export const userDragSlice = createSlice({
    name: 'userDrag',
    initialState: {
        id: null,
        fullName: null,
        phoneNumber: null,
    },
    reducers: {
        getUserData: (state, action) => {
            state.id = action.payload.id;
            state.fullName = action.payload.fullName;
            state.phoneNumber = action.payload.phoneNumber;
        },
        resetUserData: () => {
            state.id = null;
            state.fullName = null;
            state.phoneNumber = null;
        }
    }
});
export const { getUserData, resetUserData } = userDragSlice.actions;
export default userDragSlice.reducer;