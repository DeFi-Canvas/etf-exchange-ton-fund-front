import css from './funds.module.css';
import cn from 'classnames';
import { FondsWrapContainer } from '../../components/funds/funds.container';
import { injectable, token } from '@injectable-ts/core';
import { I18NService } from '@/store/i18n/i18.store';
import { useProperty } from '@frp-ts/react';

export const Funds = injectable(
    FondsWrapContainer,
    token('i18n')<I18NService>(),
    (FondsWrapContainer, i18n) => () => {
        const { Funds } = useProperty(i18n.WhatToBuy);
        return (
            <div className={cn('app-container', css.wrap)}>
                <span className={css.title}>{Funds.title}</span>
                <FondsWrapContainer />
            </div>
        );
    }
);
