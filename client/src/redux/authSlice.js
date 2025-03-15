import { createSlice } from "@reduxjs/toolkit";

// Get initial values from localStorage
const token = localStorage.getItem("authToken") || null;
const user = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  token,
  user,
  isAuthenticated: !!token, // true if token exists
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;

      // Store in localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;

      // Remove from localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
