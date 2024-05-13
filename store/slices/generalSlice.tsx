import { HotelProps, ICountries } from "@/types/general";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  hotels: HotelProps[];
  countries: ICountries[];
  categories: { title: string }[];
  update: boolean;
  filterOption: string;
} = {
  hotels: [],
  countries: [],
  categories: [
    { title: "All Categories" },
    { title: "1 star" },
    { title: "2 star" },
    { title: "3 star" },
  ],
  update: false,
  filterOption: "",
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setHotelData: (state, action: { payload: HotelProps[]; type: string }) => {
      state.hotels = action.payload;
    },
    setCategories: (
      state,
      action: { payload: { title: string }[]; type: string }
    ) => {
      state.categories = action.payload;
    },
    setCountries: (state, action: { payload: ICountries[]; type: string }) => {
      state.countries = action.payload;
    },
    setFilterOption: (state, action: { payload: string; type: string }) => {
      state.filterOption = action.payload;
    },
    updateData: (state) => {
      state.update = !state.update;
    },
  },
});

export const {
  setHotelData,
  setCategories,
  setCountries,
  setFilterOption,
  updateData,
} = generalSlice.actions;

export default generalSlice.reducer;
