import { SerchInput } from '@/components/ui-kit/serch-input/serch-input.component';
import css from './withdrow.module.css';
import { AssetsContainer } from '../deposit/assets/assets.container';
import { injectable, token } from '@injectable-ts/core';
import cn from 'classnames';
import { UserStoreService } from '@/store/user.store';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { newNewWithdrowStore } from './withdrow.store';
import { memo } from 'react';
import React from 'react';
import { newDepositRestService } from '@/API/deposit.service';
import { newWaletRestService } from '@/API/whalet.service';
import { trackTelemetree } from '@/telemetree/telemetree-entry';
import { useTWAEvent } from '@tonsolutions/telemetree-react';

const WithdrowPage = injectable(AssetsContainer, (AssetsContainer) =>
    memo(() => {
        const eventBuilder = useTWAEvent();

        return (
            <div className={css.page}>
                <div className={cn('app-container', css.pageHeader)}>
                    <h2 className={css.pageTitle}>Withdraw</h2>
                    <SerchInput
                        placeholder="Search"
                        onClick={() => {
                            trackTelemetree(
                                eventBuilder,
                                'WITHDRAW_PAGE: serch click'
                            );
                        }}
                        trackEvent="WITHDRAW_PAGE: serch event"
                    />
                </div>
                <div className={css.assetsWrapper}>
                    <AssetsContainer
                        type="withdrow"
                        onClick={() => {
                            trackTelemetree(
                                eventBuilder,
                                'WITHDRAW_PAGE: asset click'
                            );
                        }}
                    />
                </div>
            </div>
        );
    })
);

export const Withdrow = injectable(
    token('userStore')<UserStoreService>(),
    (userStore) =>
        memo(() => {
            const withdrowStore = useValueWithEffect(
                () => newNewWithdrowStore({ userStore }),
                [userStore]
            );

            const depositRestService = newDepositRestService({ userStore });
            const waletRestService = newWaletRestService({ userStore });

            return React.createElement(
                WithdrowPage({
                    withdrowStore,
                    waletRestService,
                    depositRestService,
                })
            );
        })
);
