import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  token: "",
  role: "", // Add the initial empty role property
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.token = action.payload.token; // Access token from payload
      state.role = action.payload.role; // Access role from payload (assuming the action payload has both)
    },
    logout: (state) => {
      state.loggedIn = false;
      state.token = "";
      state.role = ""; // Reset role on logout
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice;
