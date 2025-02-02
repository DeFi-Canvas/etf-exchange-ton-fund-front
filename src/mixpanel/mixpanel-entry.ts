import mixpanel from 'mixpanel-browser';
import {
    BuySellPageEvent,
    DepositPageEvent,
    MainNavBarEvent,
    ProfilePageEvent,
    WalletPageAssetsEvent,
    WalletPageEvent,
    WalletPageFundsEvent,
    WalletPageTransactionsEvent,
    WhatToBuyPageEvent,
    WithdrawPageEvent,
} from './track-events';

export type TrackMixpanelEvents =
    | WalletPageEvent
    | WalletPageAssetsEvent
    | WalletPageFundsEvent
    | WalletPageTransactionsEvent
    | MainNavBarEvent
    | ProfilePageEvent
    | WithdrawPageEvent
    | DepositPageEvent
    | WhatToBuyPageEvent
    | BuySellPageEvent;

const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_KEY;

export const trackMixpanel = (
    event: TrackMixpanelEvents,
    args?: Record<string, unknown>,
    isLink?: boolean
) => {
    if (MIXPANEL_TOKEN !== '' && MIXPANEL_TOKEN !== undefined) {
        if (isLink) {
            mixpanel.track_links('a.track-link', event, { ...args });
        }
        mixpanel.track(event, { ...args });
    }
};
