import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./example";
import userReducer from "./slices/userSlice";
import mosaicsReducer from "./slices/mosaicsSlice";
import camsReducer from "./slices/camsSlice";
import groupsReducer from "./slices/groupsSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
    reducer: {
      counter: counterSlice.reducer,
      users: userReducer,
      mosaics: mosaicsReducer,
      cams: camsReducer,
      groups: groupsReducer,
      auth: authReducer,
    }
  })

export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store