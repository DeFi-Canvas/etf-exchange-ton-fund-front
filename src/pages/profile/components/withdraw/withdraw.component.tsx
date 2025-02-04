import { ChevronRightIcon } from '@/components/Icons/Icons';
import css from './withdraw.module.css';
import { Link } from 'react-router-dom';
import { trackTelemetree } from '@/telemetree/telemetree-entry';
import { useTWAEvent } from '@tonsolutions/telemetree-react';

export const Withdraw = () => {
    const eventBuilder = useTWAEvent();

    return (
        <div className={css.cardWrapper}>
            <div className="app-container">
                <span className={css.cardTitle}>Withdraw</span>
                <Link
                    className={css.cardLink}
                    to={'/withdraw'}
                    onClick={() => {
                        trackTelemetree(
                            eventBuilder,
                            'PROFILE_PAGE: withdraw mowe'
                        );
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
