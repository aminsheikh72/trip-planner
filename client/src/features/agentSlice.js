import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const agentSlice = createSlice({
  name: "agent",
  initialState: {
    agentData: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateItinerary.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(generateItinerary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.agentData = action.payload;
        state.message = "";
      })
      .addCase(generateItinerary.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.agentData = null;
        state.message = action.payload;
      });
  },
});

export default agentSlice.reducer;

// FIRST define thunk
export const generateItinerary = createAsyncThunk(
  "GENERATE/ITINERARY",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post('/api/plan', formData);
      return response.data; // 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);