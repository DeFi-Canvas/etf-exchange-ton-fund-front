import css from './deposit.module.css';
import { SerchInput } from '@/components/ui-kit/serch-input/serch-input.component';
import { injectable } from '@injectable-ts/core';
import { AssetsContainer } from './assets/assets.container';

export const DepositPageContainer = injectable(
    AssetsContainer,
    (AssetsContainer) => () => {
        return (
            <>
                <div className={css.wrap}>
                    <h2>Deposit</h2>
                    <SerchInput placeholder="Search" />
                </div>
                <div className={css.coinCards}>
                    <AssetsContainer type={'deposit'} />
                </div>
            </>
        );
    }
);
