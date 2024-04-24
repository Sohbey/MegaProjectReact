import { configureStore } from "@reduxjs/toolkit"; // Importing configureStore function from Redux Toolkit
import authSlice from "./authSlice";

// Configuring the Redux store
const store = configureStore({
  reducer: {
    auth: authSlice,

  },
});

// Exporting the configured store
export default store;
