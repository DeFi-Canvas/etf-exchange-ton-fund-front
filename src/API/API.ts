const API_URL = 'https://etf-exchange-ton-fund-back-production.up.railway.app'

export const API = {
  getWalletInfo: async (address: string) => {
    try {
        let res = await fetch(`${API_URL}/walletbalance/${address}`)
        return await res.json()
    } catch (e) {
      return
    }
  }
}