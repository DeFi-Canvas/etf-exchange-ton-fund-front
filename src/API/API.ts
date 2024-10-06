const API_URL = 'https://62.77.156.214'

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