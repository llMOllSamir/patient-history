import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  resetEmail: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
    },
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    setResetEmail: (state, { payload }) => {
      state.resetEmail = payload;
    },
  },
});

export const { login, logout, setUserData,setResetEmail } = authSlice.actions;
export default authSlice.reducer;
