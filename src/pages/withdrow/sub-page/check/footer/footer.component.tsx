import { useNavigate } from 'react-router-dom';
import css from './footer.module.css';
import cn from 'classnames';

interface FooterProps {
    balanceAfter: number;
    currency: string;
}

export const Footer = ({ balanceAfter, currency }: FooterProps) => {
    const navigate = useNavigate();

    return (
        <div className={cn(css.footerWrap)}>
            <div className={css.availableBalance}>
                <span className={css.title}>Balance after withdraw</span>
                <div className={css.infoWrap}>
                    <img src="" alt="img" />
                    <span className={css.balance}>
                        {balanceAfter} {currency}
                    </span>
                </div>
            </div>
            <div className={css.footer}>
                <button
                    className={cn(css.nextButton)}
                    onClick={() => navigate('/withdraw/:ticker/address/final')}
                >
                    Submit and withdraw
                </button>
            </div>
        </div>
    );
};
