import { createSlice } from "@reduxjs/toolkit";
import {nanoid} from "nanoid"

export const inPersonSlice = createSlice({
    name: "inPerson", 
    initialState: {
        firstTime: JSON.parse(localStorage.getItem("firstDate")),
        times: [
            {id: nanoid(), start: "9:00", end: "9:10", active: false, time: "morning"},
            {id: nanoid(), start: "9:15", end: "9:25", active: true, time: "morning"},
            {id: nanoid(), start: "9:00", end: "9:10", active: false, time: "noon"},
            {id: nanoid(), start: "9:15", end: "9:25", active: false, time: "noon"},
            {id: nanoid(), start: "9:00", end: "9:10", active: false, time: "afternoon"},
            {id: nanoid(), start: "9:15", end: "9:25", active: false, time: "afternoon"},
        ],
    },
    reducers: {
        getFirstTime: (state, action) => {
            state.firstTime = {year: action.payload.year, month: action.payload.month, day: action.payload.day, weekDay: action.payload.weekDay}
        },
        addTime: (state, action) => {
            state.times.push({id: uuid(), start: action.payload.start, end: action.payload.end, active: action.payload.active, time: action.payload.time})
        }
    }
})

export const {getFirstTime, addTime} = inPersonSlice.actions;

export default inPersonSlice.reducer;
