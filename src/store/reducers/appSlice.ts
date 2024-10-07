import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API} from "@/API/API.ts";
import {InitialStateType} from "@/types.ts";


export const fetchWalletInfoTC = createAsyncThunk(
  'app/fetchWalletInfo',
  async (
    param: {
      address: string;
    },
    {rejectWithValue}
  ) => {
    let response = await API.getWalletInfo(param.address);
    if (!response) return rejectWithValue(null)
    return response
  }
);

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    investStep: 1,
  } as InitialStateType,
  reducers: {
    setWalletAddress: (state, action) => {
      state.wallet_address = action.payload.message;
    },
    setInvestStep: (state, action) => {
      state.investStep = action.payload
    },
    setSelectedCoinToInvest: (state, action) => {
      state.selectedCoinToInvest = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWalletInfoTC.fulfilled, (state, action) => {
      state.wallet_info = action.payload;
    });
  }
});

export const {setWalletAddress, setInvestStep,setSelectedCoinToInvest} = appSlice.actions;
export default appSlice.reducer;



