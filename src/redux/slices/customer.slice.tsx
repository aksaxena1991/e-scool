import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBaseState } from "./base.state";
import { RootState } from "../store";

export type TCustomer = {
  firstname: string;
  lastname: string;
  fullname: string;
};

interface ICustomerState extends IBaseState {
  customers: TCustomer[];
  error: any;
}

const initialState: ICustomerState = {
  requesting: false,
  success: false,
  failure: false,
  customers: [],
  error: null,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState: initialState,
  reducers: {
    doFetchCustomers: (state, action: PayloadAction) => {
      state.requesting = true;
    },
    onFetchCustomersSuccess: (state, action: PayloadAction) => {
      state.requesting = false;
      state.success = true;
      state.failure = false;
      state.customers = [
        {
          firstname: "Vijay",
          lastname: "Kumar",
          fullname: "Vijay Kumar",
        },
      ];
    },
    onFetchCustomersError: (state, action: PayloadAction) => {
      state.requesting = false;
      state.success = false;
      state.failure = true;
      state.customers = [];
      state.error = "Singin failed. Please check username/password.";
    },
  },
});

export const {
  doFetchCustomers,
  onFetchCustomersSuccess,
  onFetchCustomersError,
} = customerSlice.actions;
