import { UserStoreService } from '@/store/user.store';
import { now } from '@most/core';
import * as E from 'fp-ts/lib/Either';
import { WaletRestService } from '../whalet.service';

interface MockWaletArgs {
    userStore: UserStoreService;
}

export const NEW_WALET_REST_SERVICE = ({
    userStore,
}: MockWaletArgs): WaletRestService => {
    const { id: telegram_id } = userStore.user.get();

    return {
        getBalance: () =>
            now(
                E.right({
                    total: 100,
                    assets: [
                        {
                            id: 'id',
                            name: 'name',
                            symbol: 'symbol',
                            balance: 0,
                            price: 1,
                            image_url: 'image_url',
                            value: 2,
                        },
                    ],
                })
            ),
        getAssets: () =>
            now(
                E.right([
                    {
                        id: 'id',
                        name: 'name',
                        symbol: 'symbol',
                        balance: 0,
                        price: 1,
                        logo: 'logo',
                        value: 2,
                    },
                ])
            ),
        getFunds: () =>
            now(
                E.right([
                    {
                        id: 'id',
                        name: 'name',
                        description: 'description',
                        managementFee: 0,
                        logo: 'logo',
                        riskScore: 'riskScore',
                        updatedEvent: 'updatedEvent',
                        isAvaiable: true,
                        cost: 1,
                        assets: [
                            {
                                id: 'id',
                                name: 'name',
                                symbol: 'symbol',
                                balance: 0,
                                price: 1,
                                logo: 'logo',
                                value: 2,
                                allocationPercentage: 10,
                                ticker: 'TON',
                            },
                        ],
                        tvlValue: 2,
                        createdAt: 'createdAt',
                    },
                ])
            ),
        getWhaletFunds: () =>
            now(
                E.right([
                    {
                        id: 'id',
                        name: 'name',
                        description: 'description',
                        managementFee: 0,
                        logo: 'logo',
                        riskScore: 'riskScore',
                        updatedEvent: 'updatedEvent',
                        isAvaiable: true,
                        cost: 1,
                        assets: [
                            {
                                id: 'id',
                                name: 'name',
                                symbol: 'symbol',
                                balance: 0,
                                price: 1,
                                logo: 'logo',
                                value: 2,
                                allocationPercentage: 10,
                                ticker: 'TON',
                            },
                        ],
                        tvlValue: 2,
                        createdAt: 'createdAt',
                    },
                ])
            ),
        getTransactions: () =>
            now(
                E.right([
                    {
                        timestamp: new Date('2025-01-01').toISOString(), // ISO_DATETIME
                        asset: {
                            name: 'name',
                            ticker: 'ticker',
                            category: 'category',
                            description: 'description',
                            url: 'url',
                            price: 0,
                            withdrawalFee: 1,
                        },
                        address: 'address',
                        amount: 2,
                        value: 3,
                        tx: 'tx',
                        transactionType: 'transactionType',
                        transactionStatus: 'transactionStatus',
                    },
                ])
            ),
    };
};
