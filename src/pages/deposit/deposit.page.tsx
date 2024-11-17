import css from './deposit.module.css';
import { SerchInput } from '@/components/ui-kit/serch-input/serch-input.component';
import { injectable } from '@injectable-ts/core';
import { AssetsContainer } from './assets/assets.container';
import cn from 'classnames';

export const DepositPageContainer = injectable(
    AssetsContainer,
    (AssetsContainer) => () => {
        return (
            <div className={css.depositePage}>
                <div className={cn('app-container', css.depositeHeader)}>
                    <h2 className={css.depositeTitle}>Deposit</h2>
                    <SerchInput placeholder="Search" />
                </div>
                <div className={css.assetsWrapper}>
                    <AssetsContainer type={'deposit'} />
                </div>
            </div>
        );
    }
);
