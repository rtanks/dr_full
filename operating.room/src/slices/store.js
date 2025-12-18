import { configureStore } from "@reduxjs/toolkit";
import RequestReducer from './requestSlice';
import ModalReducer from './modalSlice';
import PatientReducer from './userSlice';

export const store = configureStore({
    reducer: {
        request: RequestReducer,
        modal: ModalReducer,
        patients:  PatientReducer
    }
})