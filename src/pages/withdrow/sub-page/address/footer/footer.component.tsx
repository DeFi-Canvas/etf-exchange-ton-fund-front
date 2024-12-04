import css from './footer.module.css';
import cn from 'classnames';
import AppButton from '@/components/app-button/app-button.component.tsx';

interface FooterProps {
    balanceAfter: number;
    isGoToCheckAvailable: boolean;
    currency: string;
    symbolLogo: string;
}

export const Footer = ({
    balanceAfter,
    isGoToCheckAvailable,
    currency,
    symbolLogo,
}: FooterProps) => {
    return (
        // TODO: Или поднять наверх или завязать на AppFooter
        <div className={cn(css.footerWrap)}>
            <div className={css.availableBalance}>
                <span className={css.title}>Balance after withdraw</span>
                <div className={css.infoWrap}>
                    <img src={symbolLogo} alt="img" className={css.availableBalanceImage} />
                    <span className={css.balance}>
                        {balanceAfter} {currency}
                    </span>
                </div>
            </div>
            <div className={css.footer}>
                <AppButton
                    label="Continue"
                    to={'/withdraw/:ticker/address/check'}
                    isDisabled={!isGoToCheckAvailable}
                />
            </div>
        </div>
    );
};
