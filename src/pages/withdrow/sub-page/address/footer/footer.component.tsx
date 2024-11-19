import { useNavigate } from 'react-router-dom';
import css from './footer.module.css';
import cn from 'classnames';

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
    const navigate = useNavigate();

    return (
        <div className={cn(css.footerWrap)}>
            <div className={css.availableBalance}>
                <span className={css.title}>Balance after withdraw</span>
                <div className={css.infoWrap}>
                    <img src={symbolLogo} alt="img" className={css.imgFooter} />
                    <span className={css.balance}>
                        {balanceAfter} {currency}
                    </span>
                </div>
            </div>
            <div className={css.footer}>
                <button
                    disabled={!isGoToCheckAvailable}
                    className={cn(css.nextButton, {
                        [css.disabled]: !isGoToCheckAvailable,
                    })}
                    onClick={() => navigate('/withdraw/:ticker/address/check')}
                >
                    Continue
                </button>
            </div>
        </div>
    );
};
