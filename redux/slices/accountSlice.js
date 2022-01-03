import { createSlice } from "@reduxjs/toolkit";
import { connectToProvider } from "./../asyncThunks/connectToProvider";
const accountSlice = createSlice({
  name: "account",
  initialState: {
    connected: null,
    connectedAddress: "",
  },
  reducers: {
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
    setConnectedAddress: (state, action) => {
      state.connectedAddress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(connectToProvider.fulfilled, (state, action) => {
      state.connected = action.payload.connected;
      state.connectedAddress = action.payload.connectedAddress;
    });
  },
});

export const accountReducer = accountSlice.reducer;
export const { setConnected, setConnectedAddress } = accountSlice.actions;
