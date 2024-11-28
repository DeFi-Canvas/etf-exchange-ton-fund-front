import css from './deposit.module.css';
import { SerchInput } from '@/components/ui-kit/serch-input/serch-input.component';
import { injectable, token } from '@injectable-ts/core';
import { AssetsContainer } from './assets/assets.container';
import cn from 'classnames';
import { UserStoreService } from '@/store/user.store';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import React, { memo } from 'react';
import { newNewWithdrowStore } from '../withdrow/withdrow.store';

export const DepositPageContainer = injectable(
    AssetsContainer,
    (AssetsContainer) => () => {
        return (
            <div className={css.page}>
                <div className={cn('app-container', css.pageHeader)}>
                    <h2 className={css.pageTitle}>Deposit</h2>
                    <SerchInput placeholder="Search" />
                </div>
                <div className={css.assetsWrapper}>
                    <AssetsContainer type="deposit" />
                </div>
            </div>
        );
    }
);

export const Deposit = injectable(
    token('userStore')<UserStoreService>(),
    (userStore) =>
        memo(() => {
            const withdrowStore = useValueWithEffect(
                () => newNewWithdrowStore({ userStore }),
                [userStore]
            );

            return React.createElement(
                DepositPageContainer({
                    withdrowStore,
                    userStore,
                })
            );
        })
);
