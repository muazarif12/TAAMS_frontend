import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [], // Empty array to store courses for each teacher
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload; // Replace existing courses with new data
    },
    // Add other reducers for specific course updates (optional)
  },
});

export const { setCourses } = teacherSlice.actions;
export default teacherSlice;
