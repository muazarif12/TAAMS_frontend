import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./user.reducer";
import appSlice from "./app.reducer";
import teacherSlice from "./teacher.reducer";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  app : appSlice.reducer,
  teacher: teacherSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
