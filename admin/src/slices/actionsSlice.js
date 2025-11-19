import { createSlice } from "@reduxjs/toolkit";

export const actionsSlice = createSlice({
    name: "actions",
    initialState: {
        medicine: {
            doctor: {status: "incomplete", items: [
                // {id, doneStatus}
            ]},
            drugstore: {status: "incomplete", items: [
                // {id, doneStatus}
            ]},
            courier: {status: "incomplete", items: [
                // {id, doneStatus}
            ]},
            interpretation: {status: "incomplete", items: [
                // {id, doneStatus}
            ]}
        },
        test: {
            doctor: {status: "incomplete", items: []},
            laboratory: {status: "incomplete", items: []},
            sample: {status: "incomplete", items: []},
            interpretation: {status: "incomplete", items: []}
        },
        paraClinic: {
            doctor: {status: "incomplete", items: []},
            paraClinic: {status: "incomplete", items: []}
        }
    },
    
    reducers: {
        selectItemForAction: (state, action) => {
            //action => {item , role, id}
            if(state[action.payload.item][action.payload.role].items.length) {
                if(state[action.payload.item][action.payload.role].items.find(item => item.id == action.payload.id)) {
                    state[action.payload.item][action.payload.role].items = state?.[action.payload.item]?.[action.payload.role].items.filter(item => item.id != action.payload.id)
                } else {
                    state[action.payload.item][action.payload.role].items= [
                        ...state?.[action.payload.item]?.[action.payload.role].items,
                        {id: action.payload.id, doneStatus: false}
                    ]
                }
            } else {
                state[action.payload.item][action.payload.role].items= [{id: action.payload.id, doneStatus: false}]
            }
        },
        //-------------------------------------------------------------
        //this field must be checked when the doneStatus is changed
        //action => {item, role}
        //this method for work don't need to parameter for items
        changeCompleteStatus: (state, action) => {
            if(!state?.[action.payload.item]?.[action.payload.role].items.length) {
                state[action.payload.item][action.payload.role] = {status: "incomplete", items: []}
            } else {
                const doneStatus = state[action.payload.item][action.payload.role].items.every(item => item.doneStatus == true);
                console.log(doneStatus)
                if(doneStatus) {
                    state[action.payload.item][action.payload.role].status = "complete"
                } else {
                    state[action.payload.item][action.payload.role].status = "incomplete"

                }
            }
        }, 
        //-------------------------------------------------------------
        //action => {item , role, id}
        changeDoneStatus: (state,action) => {
            if(state[action.payload.item][action.payload.role].items.length) {
                state[action.payload.item][action.payload.role] = {...state[action.payload.item][action.payload.role], 
                    items: state?.[action.payload.item]?.[action.payload.role].items.map(item => item.id == action.payload.id? {id: item.id, doneStatus: !item.doneStatus} : item)
                }
            }
        },
    }
})

export const {selectItemForAction, changeCompleteStatus, changeDoneStatus} = actionsSlice.actions


export default actionsSlice.reducer;