import { createSlice } from "@reduxjs/toolkit"; // Importing createSlice function from Redux Toolkit

// Initial state for authentication slice
const initialState = {
    status: false, // Authentication status, default is false
    userData: null // User data, default is null
};

// Creating authentication slice using createSlice
const authSlice = createSlice({
    name: "auth", // Name of the slice
    initialState, // Initial state
    reducers: {
        // Reducer function for login action
        login: (state, action) => {
            state.status = true; // Setting authentication status to true
            state.userData = action.payload.userData; // Setting user data from action payload
        },
        // Reducer function for logout action
        logout: (state) => {
            state.status = false; // Setting authentication status to false
            state.userData = null; // Resetting user data to null
        }
    }
});

// Extracting action creators from authSlice
export const { login, logout } = authSlice.actions;

// Exporting the reducer function generated by createSlice
export default authSlice.reducer;
