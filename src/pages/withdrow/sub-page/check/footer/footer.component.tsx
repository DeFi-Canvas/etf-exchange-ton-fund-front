import { useNavigate } from 'react-router-dom';
import css from './footer.module.css';
import cn from 'classnames';
import AppButton from '@/components/app-button/app-button.component.tsx';

interface FooterProps {
    balanceAfter: number;
    currency: string;
    symbolLogo: string;
    onWithdrow: () => void;
}

export const Footer = ({
    balanceAfter,
    currency,
    symbolLogo,
    onWithdrow,
}: FooterProps) => {
    const navigate = useNavigate();
    const onClick = () => {
        onWithdrow();
        navigate('/withdraw/:ticker/address/final');
    };

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
                <AppButton label="Submit and withdraw" onClick={onClick} />
            </div>
        </div>
    );
};
