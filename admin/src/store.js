import { configureStore } from "@reduxjs/toolkit";
import actionReducer from "./slices/actionsSlice";
import inPersonReducer from "./slices/inPersonSlice";
import selectActionReducer from "./slices/selectActionSlice";
import statusMenuReducer from "./slices/statusMenuSlice";
import doctorReducer from "./slices/doctorSlice";
import loginReducer from "./slices/loginSlice";
import adminReducer from './slices/adminSlice';
import requestReducer from './slices/requestSlice';
import patientActionReducer from './slices/patientAction'

export const store = configureStore({
    reducer: {
        admin: adminReducer,
        request: requestReducer,
        actions: actionReducer,
        inPerson: inPersonReducer,
        selectAction: selectActionReducer,
        statusMenu: statusMenuReducer,
        doctor: doctorReducer,
        loginInfo: loginReducer, 
        patientAction: patientActionReducer
    }
})