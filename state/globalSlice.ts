import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the types for the state
interface GlobalState {
  mode: "light" | "dark";
  formData: Array<Record<string, any>>;
}

// Define the initial state using the GlobalState interface
const initialState: GlobalState = {
  mode: "dark",
  formData: [],
};

// Create the slice
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    getFormData: (state, action: PayloadAction<Record<string, any>>) => {
      state.formData.push(action.payload);
    },
  },
});

// Export the actions
export const { setMode, getFormData } = globalSlice.actions;

// Export the reducer
export default globalSlice.reducer;
