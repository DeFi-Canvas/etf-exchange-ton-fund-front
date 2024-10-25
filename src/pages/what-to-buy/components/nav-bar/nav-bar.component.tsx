import {
    DepositAnaliticsIcon,
    DepositDepositIcon,
    DepositFeaturedIcon,
    DepositSwapIcon,
} from '@/components/Icons/Icons';
import css from './nav-bar.module.css';

// TODO  доделать на ссылки
export const NavBar = () => {
    return (
        <div className={css.wrap}>
            <div className={css.link}>
                <div>
                    <DepositDepositIcon />
                </div>
                <span className={css.title}>Deposit</span>
            </div>
            <div className={css.link}>
                <div>
                    <DepositSwapIcon />
                </div>
                <span className={css.title}>Swap</span>
            </div>
            <div className={css.link}>
                <div>
                    <DepositAnaliticsIcon />
                </div>
                <span className={css.title}>Analytics</span>
            </div>
            <div className={css.link}>
                <div>
                    <DepositFeaturedIcon />
                </div>
                <span className={css.title}>Featured</span>
            </div>
        </div>
    );
};
