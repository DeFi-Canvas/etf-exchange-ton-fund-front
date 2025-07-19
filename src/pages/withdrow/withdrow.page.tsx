import { SerchInput } from '@/components/ui-kit/serch-input/serch-input.component';
import css from './withdrow.module.css';
import { AssetsContainer } from '../deposit/assets/assets.container';
import { injectable, token } from '@injectable-ts/core';
import cn from 'classnames';
import { memo } from 'react';
import { trackTelemetree } from '@/telemetree/telemetree-entry';
import { useTWAEvent } from '@tonsolutions/telemetree-react';
import { I18NService } from '@/store/i18n/i18.store';
import { useProperty } from '@frp-ts/react';

export const Withdrow = injectable(
    AssetsContainer,
    token('i18n')<I18NService>(),
    (AssetsContainer, i18n) =>
        memo(() => {
            const { Withdraw } = useProperty(i18n.Withdraw);
            const eventBuilder = useTWAEvent();

            return (
                <div className={css.page}>
                    <div className={cn('app-container', css.pageHeader)}>
                        <h2 className={css.pageTitle}>{Withdraw.title}</h2>
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
