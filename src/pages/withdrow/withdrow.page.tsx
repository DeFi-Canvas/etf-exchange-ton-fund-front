import { SerchInput } from '@/components/ui-kit/serch-input/serch-input.component';
import css from './withdrow.module.css';
import { AssetsContainer } from '../deposit/assets/assets.container';
import { injectable } from '@injectable-ts/core';
import cn from 'classnames';
import { memo } from 'react';
import React from 'react';

const WithdrowPage = injectable(AssetsContainer, (AssetsContainer) =>
    memo(() => {
        return (
            <div className={css.page}>
                <div className={cn('app-container', css.pageHeader)}>
                    <h2 className={css.pageTitle}>Withdraw</h2>
                    <SerchInput placeholder="Search" />
                </div>
                <div className={css.assetsWrapper}>
                    <AssetsContainer type="withdrow" />
                </div>
            </div>
        );
    })
);

export const Withdrow = injectable(WithdrowPage, (Page) =>
    memo(() => {
        return React.createElement(Page);
    })
);
