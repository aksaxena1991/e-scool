import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBaseState } from "./base.state";
import { RootState } from "../store";

export type TCity = {
  city: string;
  state: string;
  district: string;
  country: string;
};

interface ICityState extends IBaseState {
  // fetch cities
  cities: TCity[];
  error: any;
  // add city
  city: TCity | null;
}

const initialState: ICityState = {
  requesting: false,
  success: false,
  failure: false,
  cities: [],
  error: null,
  city: null,
};

export const citySlice = createSlice({
  name: "city",
  initialState: initialState,
  reducers: {
    doFatchCities: (state, action: PayloadAction) => {
      state.requesting = true;
    },
    onFatchCitiesSuccess: (state, action: PayloadAction) => {
      state.requesting = false;
      state.failure = false;
      state.success = true;
      state.cities = [
        {
          city: "New Delhi",
          state: "Delhi",
          district: "South",
          country: "India",
        },
      ];
    },
    onFatchCitiesError: (state, action: PayloadAction) => {
      state.requesting = false;
      state.failure = true;
      state.success = false;
      state.cities = [];
      state.error = "Please enter valid city name";
    },
    addNewCity: (state, action: PayloadAction) => {
      state.requesting = true;
    },
    addCitySuccess: (state, action: PayloadAction) => {
      state.success = true;
    },
    addCityError: (state, action: PayloadAction) => {
      state.failure = true;
      state.error = "Please enter valid city name";
    },
  }});

export const {
  doFatchCities,
  onFatchCitiesSuccess,
  onFatchCitiesError,
  addNewCity,
  addCitySuccess,
  addCityError,
} = citySlice.actions;
