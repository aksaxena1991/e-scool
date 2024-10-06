import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBaseState } from "./base.state";

export type TAuth = {
  isLoggedIn: boolean;
};

interface IAuthState extends IBaseState {
  auth: TAuth | null;
  error: any;
}

const initialState: IAuthState = {
  requesting: false,
  success: false,
  failure: false,
  auth: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    doSignIn: (state, action: PayloadAction) => {
      state.requesting = true;
    },
    onSignInSuccess: (state, action: PayloadAction) => {
      state.requesting = false;
      state.success = true;
      state.failure = false;
      state.auth = {
        isLoggedIn: true,
      };
    },
    onSignInError: (state, action: PayloadAction<string>) => {
      state.requesting = false;
      state.success = false;
      state.failure = true;
      state.auth = null;
      state.error = "Singin failed. Please check username/password.";
    },
    resetSignInRequest: (state, action: PayloadAction) => {
      state.requesting = false;
      state.auth = null;
      state.error = null;
    },
  },
});

export const { doSignIn, onSignInSuccess, onSignInError } = authSlice.actions;
