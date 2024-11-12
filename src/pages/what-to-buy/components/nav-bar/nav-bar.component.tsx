import {
    DepositAnaliticsIcon,
    DepositDepositIcon,
    DepositFeaturedIcon,
    DepositSwapIcon,
} from '@/components/Icons/Icons';
import css from './nav-bar.module.css';
import { NavLink } from 'react-router-dom';

// TODO  доделать на ссылки
export const NavBar = () => {
    return (
        <div className={ 'app-container ' + css.wrap }>
            <NavLink to={'deposit'} className={css.link}>
                <div>
                    <DepositDepositIcon />
                </div>
                <span className={css.title}>Deposit</span>
            </NavLink>
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
