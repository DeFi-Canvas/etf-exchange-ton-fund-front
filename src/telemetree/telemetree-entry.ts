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

export type TrackedEvents =
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

export interface EventBuilder {
    track: (
        eventName: string,
        eventProperties: Record<string, any>
    ) => Promise<void>;
}

export const trackTelemetree = (
    eventBuilder: EventBuilder,
    event: TrackedEvents,
    args?: Record<string, unknown>
) => {
    eventBuilder.track(event, { ...args });
};
