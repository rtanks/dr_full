import { createSlice } from "@reduxjs/toolkit";
import { isEmptyArray } from "../services/func/requirementFunc";

export const doctorSlice = createSlice({
    name: "doctor",
    initialState: {
        consulting: {
            inPerson: {
                status: false,//if false is inactive and if true is active so display the times
                times: {
                        date: [],//select a date and so select time
                        timeConsulting: [],//save times with format 12:34 as string
                    },
                    //if proliferation so add object with format above
            }
        }
    },
    reducers: {
        addInPersonTimeConsulting: (state, action) => {
            if(isEmptyArray(state.consulting.inPerson.times.date)) {
                state.consulting.inPerson.times.date.push(action.payload.date)
            } 
            if(action.payload.times == null) {
                state.consulting.inPerson.times.date.push(action.payload.date)
            } 
            if(action.payload.date == null) {
                state.consulting.inPerson.times.timeConsulting.push(action.payload.times)
            } 
        },
        proliferationTimeConSulting: (state, action) => {
            state.consulting.inPerson.times.date.push(action.payload.date)
        },
        changeStatusActive: (state) => {
            state.consulting.inPerson.status = !state.consulting.inPerson.status
        }, 
        editInPersonTimesConsulting: (state, action) => {
            state.consulting.inPerson.times.timeConsulting = action.payload.times;
        }
    }
})

export const {addInPersonTimeConsulting, proliferationTimeConSulting, changeStatusActive, editInPersonTimesConsulting} = doctorSlice.actions;

export default doctorSlice.reducer;