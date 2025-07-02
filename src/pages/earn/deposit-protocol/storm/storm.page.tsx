import { SpinIcon, WalletIcon } from '@/components/Icons/Icons';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import { AssetBalance } from '@/instance/asset/asset.model';
import PurchaseSellAttention from '@/pages/what-to-buy/sub-page/components/purchase-sell-attention/purchase-sell-attention.component';
import PurchaseSellTitle from '@/pages/what-to-buy/sub-page/components/purchase-sell-title/purchase-sell-title.component';
import * as E from 'fp-ts/Either';
import { Error } from '@/store/errors/error-system';
import css from './storm.module.css';
import cn from 'classnames';
import AppButton from '@/components/app-button/app-button.component';
import AppFooter from '@/components/app-footer/app-footer.components';
import BottomSheet from '@/components/ui-kit/bottom-sheet/bottom-sheet.component';
import { useNavigate } from 'react-router-dom';
import { Action } from './storm.store';
import SkeletonLine from '@/components/skeletons/components/skeleton-line/skeleton-line.component';

interface StormProps {
    asset: E.Either<Error, AssetBalance>;
    activeAction: Action;
    setActiveAction: (a: Action) => void;
    setAmount: (a: number) => void;
    action: () => void;
    requestFinish: boolean;
    isBottomSheetOpen: boolean;
    handleMaxClick: () => void;
    amount: number | null;
    maxAvailable: number | null;
    isActionButtonEnabled: boolean;
}

export const Storm = ({
    asset,
    activeAction,
    setActiveAction,
    setAmount,
    action,
    requestFinish,
    isBottomSheetOpen,
    handleMaxClick,
    amount,
    maxAvailable,
    isActionButtonEnabled,
}: StormProps) => {
    const navigate = useNavigate();

    const attentionText = {
        title: 'Attention',
        text: 'Investments in the beta testing phase. Please consider the risks.',
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
                    loading={() => <SkeletonLine />}
                    success={({ imageUrl, balance, ticker }: AssetBalance) => (
                        <AssetCard
                            imageUrl={imageUrl}
                            balance={balance}
                            ticker={ticker}
                        />
                    )}
                />
                <AmountField
                    maxAvailable={maxAvailable}
                    handleChange={setAmount}
                    amount={amount}
                    handleMaxClick={handleMaxClick}
                />

                <div>
                    <h3>Description</h3>
                    You provide USDT to traders, in return you get 70% of
                    commissions (trading fees, penalties, funding fees). At the
                    same time, the same pool serves as a reserve for payments on
                    profitable trades of traders, in case of large payments, the
                    return on deposit may become negative.
                </div>
            </div>
            <AppFooter>
                <AppButton
                    label={activeAction === 'DEPOSIT' ? 'Deposit' : 'Withdraw'}
                    onClick={action}
                    isLoading={false}
                    isDisabled={!isActionButtonEnabled}
                />
            </AppFooter>

            <BottomSheet
                open={isBottomSheetOpen}
                hasButtonClose={true}
                onClose={() => navigate('/')}
            >
                <div className={css.info}>
                    <div className={css.bottomSheetTitle}>Deposit in Storm</div>
                    {!requestFinish && (
                        <div className={css.loading}>
                            <SpinIcon />
                        </div>
                    )}
                    {requestFinish && (
                        <>
                            <span>Your transaction is in transit</span>
                            <span>check your balance</span>
                        </>
                    )}
                </div>
            </BottomSheet>
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
    maxAvailable: number | null;
    handleChange: (a: number) => void;
    amount: number | null;
    handleMaxClick: () => void;
}

const AmountField = ({
    maxAvailable,
    handleChange,
    amount,
    handleMaxClick,
}: AmountFieldProps) => {
    return (
        <div className={css.amountField}>
            <div className={css.titleWrap}>
                <span>Amount ($)</span>
                <div className={css.wallet}>
                    <WalletIcon />
                    {`$ ${maxAvailable ? maxAvailable.toFixed(2) : '0,00'}`}
                    <span onClick={handleMaxClick}>MAX</span>
                </div>
            </div>
            <input
                value={amount ?? ''}
                type="number"
                className={css.input}
                placeholder="Enter amount"
                onChange={(e) => handleChange(Number(e.currentTarget.value))}
            />
        </div>
    );
};
interface SwitcherProps {
    activeAction: Action;
    setActiveAction: (a: Action) => void;
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
                Withdraw
            </span>
        </div>
    );
};
