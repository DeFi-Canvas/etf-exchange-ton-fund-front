import css from './funds.module.css';
import cn from 'classnames';
import { FondsWrapContainer } from '../../components/funds/funds.container';
import { injectable } from '@injectable-ts/core';

export const Funds = injectable(
    FondsWrapContainer,
    (FondsWrapContainer) => () => {
        return (
            <div className={cn('app-container', css.wrap)}>
                <span className={css.title}>What to buy</span>
                <FondsWrapContainer />
            </div>
        );
    }
);
