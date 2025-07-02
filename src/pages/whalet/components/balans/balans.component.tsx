import * as O from 'fp-ts/Option';
import css from './balans.module.css';
import { OptionSpan } from '@/components/ui-kit/fpts-components-utils/options.component';
import { constVoid, pipe } from 'fp-ts/lib/function';
import { Balance } from '../../wallet.view-model';
import cn from 'classnames';
import { useTWAEvent } from '@tonsolutions/telemetree-react';
import { WalletI18n } from '../../wallet.i18n.model';
import {
    SendTransactionRequest,
    TonConnectButton,
    useTonAddress,
    useTonConnectUI,
} from '@tonconnect/ui-react';
import { beginCell } from '@ton/core';
import BottomSheet from '@/components/ui-kit/bottom-sheet/bottom-sheet.component';
import { WalletIcon } from '@/components/Icons/Icons';
import AppButton from '@/components/app-button/app-button.component';

export interface BalansProps {
    balance: O.Option<Balance>;
    texts: WalletI18n;
    isBottomSheetOpen: boolean;
    chainTransaction: SendTransactionRequest;

    setBottomSheetOpen: (o: boolean) => void;
    setDepositAmmount: (a: number) => void;
}

export const Balans = ({
    balance,
    texts,
    isBottomSheetOpen,
    chainTransaction,
    setBottomSheetOpen,
    setDepositAmmount,
}: BalansProps) => {
    const eventBuilder = useTWAEvent();
    const [tonConnectUI, setOptions] = useTonConnectUI();
    const userFriendlyAddress = useTonAddress(true);
    const userFriendlyAddressSplited = userFriendlyAddress.split('');

    return (
        <div className={cn('app-container', css.wrap)}>
            <div className={css.labelWrap}>
                <span className={css.label}>{texts.balance.title}</span>
                <div className={css.wallet}>
                    <TonConnectButton />
                    {!!userFriendlyAddress.length && (
                        <button
                            className={css.deposit}
                            onClick={() => setBottomSheetOpen(true)}
                        >
                            Deposit
                        </button>
                    )}
                </div>
            </div>
            <div className={css.balans}>
                <OptionSpan
                    modificator="$"
                    data={pipe(
                        balance,
                        O.map((x) => x.int)
                    )}
                />
                <OptionSpan
                    data={pipe(
                        balance,
                        O.map((x) => x.float)
                    )}
                    className={css.shadow}
                />
            </div>
            <BottomSheet
                open={isBottomSheetOpen}
                hasButtonClose={false}
                onClose={() => setBottomSheetOpen(false)}
            >
                <div className={css.bottomSheet}>
                    <h3>Deposit</h3>
                    <span>Top-up only in TON</span>
                    <div className={css.info}>
                        <span>Your connected wallet</span>
                        <span className={css.address}>
                            <WalletIcon />
                            {`${userFriendlyAddressSplited.slice(0, 3).join('')}..${userFriendlyAddressSplited.slice(userFriendlyAddressSplited.length - 3, userFriendlyAddressSplited.length).join('')}`}
                        </span>
                        <div className={css.control}>
                            <input
                                type="number"
                                onChange={(e) =>
                                    setDepositAmmount(Number(e.target.value))
                                }
                            />
                            <span>TON</span>
                        </div>
                    </div>
                    <AppButton
                        label={'Deposit'}
                        onClick={() =>
                            tonConnectUI.sendTransaction(chainTransaction)
                        }
                    />
                </div>
            </BottomSheet>
        </div>
    );
};
