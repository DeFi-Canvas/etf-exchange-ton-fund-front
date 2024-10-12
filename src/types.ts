export type ETFType = {
  jettonSymbol: string
  title: string
  description: string
  imgUrl: string
  address?:string
  tvl?: number
  aprPercent?: number
  etfPriceChange?: number
  badgeText?: string
  about: {
    text: string
    features?: Array<ETFFeatureType>
  },
  inside: Array<ETFInsideType>,
  faq?: Array<ETFFaqType>
}

export type ETFFeatureType = {
  title: string
  subTitle:string
  image: string
}

export type ETFInsideType = {
  title: string
  subTitle:string
  image: string
  numbers?: string
}

export type ETFFaqType = {
  question: string
  answer: string
}

export type InitialStateType = {
  appStatus: 'loading' | 'idle'
  userData?: {
    user_id: 1,
    address: Array<string>,
    created_at: number,
    updated_at: number
  }
  selectedCoinToInvest?: string
  valueToInvest: number
  wallet_address?: string
  wallet_info?: {
    balance: number,
    price: number,
    totalamount: number,
    jettons: Array<JettonType>
  }
};

export type JettonType = {
  name: string
  symbol: string
  balance: number
  image: string
  wallet: string
  price: number
  jetton: string
}