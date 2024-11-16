import { ChevronRightIcon } from '@/components/Icons/Icons';
import css from './withdraw.module.css';
import { Link } from 'react-router-dom';

export const Withdraw = () => {
    return (
        <div className={ css.cardWrapper }>
            <div className="app-container">
                <span className={ css.cardTitle }>Withdraw</span>
                <Link className={ css.cardLink } to={ '/withdraw' }>
                    <span className={ css.cardLinkText }>Withdraw cryptocurrency</span>
                    <ChevronRightIcon />
                </Link>
            </div>
        </div>
    );
};
