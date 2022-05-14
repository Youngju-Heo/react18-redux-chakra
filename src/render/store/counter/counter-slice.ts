/* eslint-disable no-console */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    countIncrement: (state) => {
      // console.log("add");
      state.value += 1;
    },
    countDecrement: (state) => {
      state.value -= 1;
    },
    countIncrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { countIncrement, countDecrement, countIncrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
