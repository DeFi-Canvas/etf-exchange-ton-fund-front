import { trackTelemetree } from '@/telemetree/telemetree-entry';
import css from './documentation.module.css';
import { Link } from 'react-router-dom';
import { useTWAEvent } from '@tonsolutions/telemetree-react';

export const Documentation = () => {
    const documentationLink =
        'https://defi-canvas.github.io/etf-exchange-ton-fund-gitbook/';
    const eventBuilder = useTWAEvent();

    return (
        <div className={css.cardWrapper}>
            <div className="app-container">
                <Link
                    to={documentationLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                        trackTelemetree(
                            eventBuilder,
                            'PROFILE_PAGE: documentation click'
                        );
                    }}
                >
                    Documentation
                </Link>
            </div>
        </div>
    );
};
