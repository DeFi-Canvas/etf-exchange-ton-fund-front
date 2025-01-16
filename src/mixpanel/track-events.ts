//DONE
export type WalletPageEvent =
    | 'WALLET_PAGE: deposit button click'
    | 'WALLET_PAGE: portfolio button click'
    | 'WALLET_PAGE: assistant button click'
    | 'WALLET_PAGE: "earn slide" click'
    | 'WALLET_PAGE: "lern more" slide click'
    | 'WALLET_PAGE: notification button click';

//DONE
export type WalletPageAssetsEvent =
    | 'WALLET_PAGE_ASSETS: Assets button click'
    | 'WALLET_PAGE_ASSETS: specific asset  click';

//DONE
export type WalletPageFundsEvent =
    | 'WALLET_PAGE_FUNDS: Funds button click'
    | 'WALLET_PAGE_FUNDS: specific fund  click';

//DONE
export type WalletPageTransactionsEvent =
    | 'WALLET_PAGE_TRANSACTIONS: Transactions button click'
    | 'WALLET_PAGE_TRANSACTIONS: specific transaction  click';

//DONE
export type MainNavBarEvent =
    | 'MAIN_NAV_BAR: move home page'
    | 'MAIN_NAV_BAR: move wtb page'
    | 'MAIN_NAV_BAR: move profile page';

//DONE
export type ProfilePageEvent =
    | 'PROFILE_PAGE: user click'
    | 'PROFILE_PAGE: earn event'
    | 'PROFILE_PAGE: settings event'
    | 'PROFILE_PAGE: documentation click'
    | 'PROFILE_PAGE: withdraw mowe';

//DONE - Нужны послед стр
export type WithdrawPageEvent =
    | 'WITHDRAW_PAGE: serch click'
    | 'WITHDRAW_PAGE: serch event'
    | 'WITHDRAW_PAGE: asset click';

//DONE
export type DepositPageEvent =
    | 'DEPOSIT_PAGE: serch click'
    | 'DEPOSIT_PAGE: serch event'
    | 'DEPOSIT_PAGE: asset click'
    | 'DEPOSIT_PAGE: deposit address copy click'
    | 'DEPOSIT_PAGE: Tag/Memo (Comment/Note) copy click'
    | 'DEPOSIT_PAGE: finish click';

//DONE
export type WhatToBuyPageEvent =
    | 'WHAT_TO_BUY_PAGE: Fund mowe'
    | 'WHAT_TO_BUY_PAGE: author click'
    | 'WHAT_TO_BUY_PAGE: buy click'
    | 'WHAT_TO_BUY_PAGE: sell click';

export type BuySellPageEvent =
    | 'BUY_SELL_PAGE: fund click'
    | 'BUY_SELL_PAGE: assetOprions click'
    | 'BUY_SELL_PAGE: asset click'
    | 'BUY_SELL_PAGE: buy/sell click';
