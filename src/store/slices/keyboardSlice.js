import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mask: "",
  value: "",
input: null,
  inputMode: "",
  openKeyboard: false,
  focusedInput: false,
};

const keyboardSlice = createSlice({
  name: "keyboard",
  initialState,
  reducers: {
    chooseInput: (state, action) => {
      state.mask = action.payload.mask;
      state.input = action.payload.input;
      state.value = action.payload.input.value;
      state.inputMode = action.payload.inputMode;
    },

    openOrCloseKeyboard: (state, action) => {
      state.openKeyboard = action.payload;
    },

    focusInput: (state, action) => {
      state.focusedInput = action.payload;
    },

    changeInputValue: (state, action) => {
      if (state.input) {
        state.input.value = action.payload;
        state.value = action.payload;
      }
    },
  },
});

const { actions, reducer } = keyboardSlice;

export const {
  chooseInput,
  changeInputValue,
  openOrCloseKeyboard,
  focusInput,
} = actions;

export default reducer;
