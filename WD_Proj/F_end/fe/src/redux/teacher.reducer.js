import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  teachers: [], // Empty array to store courses for each teacher
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    setTeachers: (state, action) => {
      state.courses = action.payload; // Replace existing courses with new data
    },
    // Add other reducers for specific course updates (optional)
  },
});

export const { setTeachers } = teacherSlice.actions;
export default teacherSlice;
