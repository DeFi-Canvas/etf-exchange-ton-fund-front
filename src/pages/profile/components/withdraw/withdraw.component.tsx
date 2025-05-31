import { ChevronRightIcon } from '@/components/Icons/Icons';
import css from './withdraw.module.css';
import { Link } from 'react-router-dom';
import { trackTelemetree } from '@/telemetree/telemetree-entry';
import { useTWAEvent } from '@tonsolutions/telemetree-react';
import { ProfileI18n } from '../../profile.i18n.model';

interface WithdrawProps {
    i18nText: ProfileI18n;
}

export const Withdraw = ({ i18nText }: WithdrawProps) => {
    const eventBuilder = useTWAEvent();

    return (
        <div className={css.cardWrapper}>
            <div className="app-container">
                <span className={css.cardTitle}>
                    {' '}
                    {i18nText.withdraw.title}
                </span>
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
                        {i18nText.withdraw.linkLabel}
                    </span>
                    <ChevronRightIcon />
                </Link>
            </div>
        </div>
    );
};
