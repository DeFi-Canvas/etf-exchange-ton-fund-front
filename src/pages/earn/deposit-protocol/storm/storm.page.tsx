import { WalletIcon } from '@/components/Icons/Icons';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import { AssetBalance } from '@/instance/asset/asset.model';
import PurchaseSellAttention from '@/pages/what-to-buy/sub-page/components/purchase-sell-attention/purchase-sell-attention.component';
import PurchaseSellTitle from '@/pages/what-to-buy/sub-page/components/purchase-sell-title/purchase-sell-title.component';
import * as E from 'fp-ts/Either';
import { Error } from '@/store/errors/error-system';
import css from './storm.module.css';
import cn from 'classnames';
import { useState } from 'react';
import AppButton from '@/components/app-button/app-button.component';
import AppFooter from '@/components/app-footer/app-footer.components';
import { constVoid } from 'fp-ts/lib/function';

interface StormProps {
    asset: E.Either<Error, AssetBalance>;
    activeAction: 'DEPOSIT' | 'WITHDROW';
    setActiveAction: (a: 'DEPOSIT' | 'WITHDROW') => void;
}

export const Storm = ({ asset, activeAction, setActiveAction }: StormProps) => {
    const attentionText = {
        title: 'Attention',
        text: 'Investments in the funds are in the beta testing phase. Please consider the risks.',
    };

    return (
        <div>
            <div className="app-container">
                <PurchaseSellTitle title={'Storm'} />
                <PurchaseSellAttention {...attentionText} />
            </div>
            <div className={css.controls}>
                <Switcher
                    activeAction={activeAction}
                    setActiveAction={setActiveAction}
                />

                <RenderResult
                    data={asset}
                    success={({ imageUrl, balance, ticker }: AssetBalance) => (
                        <AssetCard
                            imageUrl={imageUrl}
                            balance={balance}
                            ticker={ticker}
                        />
                    )}
                />
                <AmountField maxAvailable={0} />

                <div>
                    <h3>description</h3>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Nam, qui expedita esse nulla fugit voluptatibus ea
                    cupiditate. Laborum illum consectetur eius optio, ab et nemo
                    necessitatibus eaque quidem, quibusdam asperiores.
                </div>
            </div>
            <AppFooter>
                <AppButton
                    label={activeAction === 'DEPOSIT' ? 'Deposit' : 'Withdrow'}
                    onClick={constVoid}
                    isLoading={false}
                    isDisabled={false}
                />
            </AppFooter>
        </div>
    );
};

interface AssetCardProps {
    imageUrl: string;
    balance: number;
    ticker: string;
}

const AssetCard = ({ imageUrl, balance, ticker }: AssetCardProps) => {
    return (
        <div className={css.assetCard}>
            <img src={imageUrl} />
            <span>
                {balance} {ticker}
            </span>
        </div>
    );
};

interface AmountFieldProps {
    maxAvailable: number;
}

const AmountField = ({ maxAvailable }: AmountFieldProps) => {
    return (
        <div className={css.amountField}>
            <div className={css.titleWrap}>
                <span>Amount ($)</span>
                <div className={css.wallet}>
                    <WalletIcon />
                    {`$ ${maxAvailable.toFixed(2)}`}
                    <span>MAX</span>
                </div>
            </div>
            <input
                type="number"
                className={css.input}
                placeholder="Enter amount"
            />
        </div>
    );
};
interface SwitcherProps {
    activeAction: 'DEPOSIT' | 'WITHDROW';
    setActiveAction: (a: 'DEPOSIT' | 'WITHDROW') => void;
}
export const Switcher = ({ activeAction, setActiveAction }: SwitcherProps) => {
    return (
        <div className={css.switcher}>
            <span
                className={cn(css.title, {
                    [css.active]: activeAction === 'DEPOSIT',
                })}
                onClick={() => setActiveAction('DEPOSIT')}
            >
                Deposit
            </span>
            <span
                className={cn(css.title, {
                    [css.active]: activeAction === 'WITHDROW',
                })}
                onClick={() => setActiveAction('WITHDROW')}
            >
                Withdrow
            </span>
        </div>
    );
};
