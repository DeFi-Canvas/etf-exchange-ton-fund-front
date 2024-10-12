import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API, Balance} from "@/API/API.ts";
import {InitialStateType, JettonType} from "@/types.ts";
import {TonConnectUI} from "@tonconnect/ui-react";
import {RootStateType} from "@/store";
import {super_msg} from "@/utils/initSwapMessage.ts";
import {address, beginCell, Dictionary} from "@ton/ton";


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


export const callContract = createAsyncThunk('app/callContract', async ({tonui, wallet}: {
  tonui: TonConnectUI,
  wallet: string
}, {getState, dispatch}) => {
  try {
    const store = getState() as RootStateType
    const valueToInvest = store.appSlice.valueToInvest
    const prevWalletJettons = store.appSlice?.wallet_info?.jettons

    await tonui.sendTransaction({
      validUntil: Math.floor(Date.now() / 1000) + 360, // 60 sec
      messages: [
        {
          address: 'EQDwAUGq_KM0Aa5clRch8gkcUWqknVC0aH2i0E1AoP4RXq_q',
          amount: (valueToInvest * 1000000000).toString(),
          payload: super_msg.toBoc().toString('base64'),
        }
      ]
    })


    const getJettonWallet = async () => {
      return await API.getWalletInfo(wallet!).then((res) => {
        return res?.jettons?.find((j: JettonType) => j.jetton === "0:f00141aafca33401ae5c951721f2091c516aa49d50b4687da2d04d40a0fe115e")?.wallet
      })
    }

    const getJettonWalletEveryThreeSeconds = async () => {
      let jetton_wallet = await getJettonWallet()
      while (!jetton_wallet) {
        jetton_wallet = await getJettonWallet()
        await new Promise(resolve => setTimeout(resolve, 3000))
      }
      return jetton_wallet
    }

    const jetton_wallet = await getJettonWalletEveryThreeSeconds()

    const getJettonsBalance = async () => {
      return await API.getWalletJettons(jetton_wallet!)
    }
    const getJettonsBalanceEveryThreeSeconds = async () => {
      let balance = await getJettonsBalance()
      while (!balance || balance?.length !== 3 || balance.some((b: Balance) => b.balance === '0')) {
        balance = await getJettonsBalance()
        await new Promise(resolve => setTimeout(resolve, 3000))
      }
      return balance
    }

    const jettons_balance = await getJettonsBalanceEveryThreeSeconds()

    let b = Dictionary.empty(Dictionary.Keys.Uint(8), Dictionary.Values.Cell())
      .set(0, beginCell().storeAddress(address(jettons_balance[0].wallet_address.address)).storeCoins(BigInt(jettons_balance[0].balance)).endCell())
      .set(1, beginCell().storeAddress(address(jettons_balance[1].wallet_address.address)).storeCoins(BigInt(jettons_balance[1].balance)).endCell())
      .set(2, beginCell().storeAddress(address(jettons_balance[2].wallet_address.address)).storeCoins(BigInt(jettons_balance[2].balance)).endCell());

    let msg_body = beginCell()
      .storeUint(0x2fd16ab4, 32)
      .storeUint(0, 64)
      .storeDict(b)
      .endCell();

    await tonui.sendTransaction({
      validUntil: Math.floor(Date.now() / 1000) + 360, // 60 sec
      messages: [
        {
          address: jetton_wallet,
          amount: (0.4 * 1000000000).toString(),
          payload: msg_body.toBoc().toString('base64'),
        }
      ]
    })


    const getWalletInfoEveryThreeSeconds = async () => {
      let wallet_info = await dispatch(fetchWalletInfoTC({address: wallet!})).then((res) => res.payload as {
        balance: number,
        price: number,
        totalamount: number,
        jettons: Array<JettonType>
      })

      const prevLPBalance = prevWalletJettons?.find((j) => j?.jetton === "0:f00141aafca33401ae5c951721f2091c516aa49d50b4687da2d04d40a0fe115e")?.balance

      while (!wallet_info || !prevLPBalance || prevLPBalance === wallet_info?.jettons.find((j) => j?.jetton === "0:f00141aafca33401ae5c951721f2091c516aa49d50b4687da2d04d40a0fe115e")?.balance) {
        wallet_info = await dispatch(fetchWalletInfoTC({address: wallet!})).then((res) => res.payload as {
          balance: number,
          price: number,
          totalamount: number,
          jettons: Array<JettonType>
        })
        await new Promise(resolve => setTimeout(resolve, 3000))
      }
      return true
    }

    return await getWalletInfoEveryThreeSeconds()
  } catch (e) {
    console.log(e)
  }
})

export const sendUserDataTC = createAsyncThunk(
  'app/sendUserData',
  async (userData: { id: number | string, userName: string }, {rejectWithValue, dispatch}) => {
    let res = await API.sendAppOpened(userData)
    if (res && !Array.isArray(res) && res.updated_at === res.created_at) {
      await dispatch(setAppStatus('idle'))
    }
    return res || rejectWithValue(null)

  }
)

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    appStatus: 'loading',
    valueToInvest: 1,
  } as InitialStateType,
  reducers: {
    setWalletAddress: (state, action) => {
      state.wallet_address = action.payload.message;
    },
    setSelectedCoinToInvest: (state, action) => {
      state.selectedCoinToInvest = action.payload
    },
    refreshWalletInfo: (state) => {
      state.wallet_info = undefined
    },
    setValueToInvest: (state, action) => {
      state.valueToInvest = action.payload
    },
    setAppStatus: (state, action) => {
      state.appStatus = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWalletInfoTC.fulfilled, (state, action) => {
        state.wallet_info = action.payload;
      })
      .addCase(sendUserDataTC.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
  }
});

export const {
  setWalletAddress,
  setSelectedCoinToInvest,
  refreshWalletInfo,
  setValueToInvest,
  setAppStatus
} = appSlice.actions;
export default appSlice.reducer;



