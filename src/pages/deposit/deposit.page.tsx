import css from './deposit.module.css';
import { SerchInput } from '@/components/ui-kit/serch-input/serch-input.component';
import { injectable, token } from '@injectable-ts/core';
import { AssetsContainer } from './assets/assets.container';
import cn from 'classnames';
import React, { memo } from 'react';
import { trackTelemetree } from '@/telemetree/telemetree-entry';
import { useTWAEvent } from '@tonsolutions/telemetree-react';
import { I18NService } from '@/store/i18n/i18.store';
import { useProperty } from '@frp-ts/react';

export const Deposit = injectable(
    AssetsContainer,
    token('i18n')<I18NService>(),
    (AssetsContainer, i18n) => () => {
        const eventBuilder = useTWAEvent();
        const { Deposit } = useProperty(i18n.Deposit);
        return (
            <div className={css.page}>
                <div className={cn('app-container', css.pageHeader)}>
                    <h2 className={css.pageTitle}>{Deposit.title}</h2>
                    <SerchInput
                        placeholder="Search"
                        onClick={() =>
                            trackTelemetree(
                                eventBuilder,
                                'DEPOSIT_PAGE: serch click'
                            )
                        }
                        trackEvent="DEPOSIT_PAGE: serch event"
                    />
                </div>
                <div className={css.assetsWrapper}>
                    <AssetsContainer
                        type="deposit"
                        onClick={() => {
                            trackTelemetree(
                                eventBuilder,
                                'DEPOSIT_PAGE: asset click'
                            );
                        }}
                    />
                </div>
            </div>
        );
    }
);
