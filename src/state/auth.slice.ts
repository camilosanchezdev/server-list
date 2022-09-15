import { createSlice } from "@reduxjs/toolkit";

interface authStateAttributes {
  isLogged: boolean;
  token: string;
}

const authInitialState: authStateAttributes = {
  isLogged: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") ?? "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    login: (reducerRdxState, action) => {
      reducerRdxState.isLogged = true;
      reducerRdxState.token = action.payload.token;
    },
    logout: (reducerRdxState) => {
      localStorage.clear();
      reducerRdxState.isLogged = false;
      reducerRdxState.token = "";
    },
    register: (reducerRdxState, action) => {
      reducerRdxState.token = action.payload.token;
    },
  },
});

export const { login, logout, register } = authSlice.actions;

export default authSlice.reducer;
