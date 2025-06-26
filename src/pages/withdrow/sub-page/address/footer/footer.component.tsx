import css from './footer.module.css';
import cn from 'classnames';
import AppButton from '@/components/app-button/app-button.component.tsx';
import * as E from 'fp-ts/Either';
import { trackTelemetree } from '@/telemetree/telemetree-entry';
import { useTWAEvent } from '@tonsolutions/telemetree-react';
import { Error } from '@/store/errors/error-system';

interface FooterProps {
    balanceAfter: number;
    isGoToCheckAvailable: boolean;
    currency: string;
    symbolLogo: string;
    address: E.Either<Error, string>;
    memo: E.Either<Error, string>;
    texts: {
        balance: string;
        button: string;
    };
}

export const Footer = ({
    balanceAfter,
    isGoToCheckAvailable,
    currency,
    symbolLogo,
    address,
    memo,
    texts,
}: FooterProps) => {
    const eventBuilder = useTWAEvent();

    return (
        // TODO: Или поднять наверх или завязать на AppFooter
        <div className={cn(css.footerWrap)}>
            <div className={css.availableBalance}>
                <span className={css.title}>{texts.balance}</span>
                <div className={css.infoWrap}>
                    <img
                        src={symbolLogo}
                        alt="img"
                        className={css.availableBalanceImage}
                    />
                    <span className={css.balance}>
                        {balanceAfter} {currency}
                    </span>
                </div>
            </div>
            <div className={css.footer}>
                <AppButton
                    label={texts.button}
                    to={'/withdraw/:ticker/address/check'}
                    isDisabled={!isGoToCheckAvailable}
                    onClick={() => {
                        trackTelemetree(
                            eventBuilder,
                            'WITHDRAW_PAGE_ENTER_ADDRESS: continue click',
                            {
                                address,
                                memo,
                            }
                        );
                    }}
                />
            </div>
        </div>
    );
};
