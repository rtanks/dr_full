import { configureStore } from "@reduxjs/toolkit";
import RequestReducer from './requestSlice';
import ModalReducer from './modalSlice';

export const store = configureStore({
    reducer: {
        request: RequestReducer,
        modal: ModalReducer,
    }
})