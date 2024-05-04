import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courses:[],
    applications:[],
    slots:[],
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setCourses: (state, action) =>  {
            state.courses = action.payload;
        },
        setSlots: (state, action) => {
            state.slots = action.payload;
        },
        setApplications: (state,action) => {
            state.applications = action.payload;
        },
    },
});

export const { setCourses, setSlots, setApplications } = appSlice.actions;
export default appSlice;