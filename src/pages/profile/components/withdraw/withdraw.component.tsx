import { ChevronRightIcon } from '@/components/Icons/Icons';
import css from './withdraw.module.css';
import { Link } from 'react-router-dom';
import { trackMixpanel } from '@/mixpanel/mixpanel-entry';

export const Withdraw = () => {
    return (
        <div className={css.cardWrapper}>
            <div className="app-container">
                <span className={css.cardTitle}>Withdraw</span>
                <Link
                    className={css.cardLink}
                    to={'/withdraw'}
                    onClick={() => {
                        trackMixpanel('PROFILE_PAGE: withdraw mowe', {}, true);
                    }}
                    onTouchStart={() => {
                        trackMixpanel('PROFILE_PAGE: withdraw mowe', {}, true);
                    }}
                >
                    <span className={css.cardLinkText}>
                        Withdraw cryptocurrency
                    </span>
                    <ChevronRightIcon />
                </Link>
            </div>
        </div>
    );
};
