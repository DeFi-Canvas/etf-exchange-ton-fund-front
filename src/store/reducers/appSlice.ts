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
   /* wallet_address: 'UQAQMxo4Cxx1yxU8bEwiS02IKvFGAkH6c6IrueO2h_3cPj-a',
    wallet_info: {
      "balance": 1.908952552,
      "price": 5.37975,
      "totalamount": 10.27,
      "jettons": [{
        "name": "TEST JETTONY",
        "symbol": "TSTJ",
        "balance": 30000,
        "price": 0,
        "image": "https://cache.tonapi.io/imgproxy/cOMlJuViiVXDCkAghnyNj7plX8pAZ9pv3WhklvebpTY/rs:fill:200:200:1/g:no/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3RvbmtlZXBlci9vcGVudG9uYXBpL21hc3Rlci9wa2cvcmVmZXJlbmNlcy9tZWRpYS90b2tlbl9wbGFjZWhvbGRlci5wbmc.webp",
        "wallet": "0:e7eaf87e652521dd15f004d92993f92610640fd43108be974f9a059baa691410",
        "jetton": "0:f916a5c64f15f915da3afac4d33274a8dc1fe29c98cd76bcf21e252e309d097b"
      }]
    }*/
  } as InitialStateType,
  reducers: {
    setWalletAddress: (state, action) => {
      state.wallet_address = action.payload.message;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWalletInfoTC.fulfilled, (state, action) => {
      state.wallet_info = action.payload;
    });
  }
});

export const {setWalletAddress} = appSlice.actions;
export default appSlice.reducer;



