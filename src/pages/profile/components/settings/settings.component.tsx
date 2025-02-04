import { trackTelemetree } from '@/telemetree/telemetree-entry';
import css from './settings.module.css';
import { useTWAEvent } from '@tonsolutions/telemetree-react';

export const Settings = () => {
    const eventBuilder = useTWAEvent();

    return (
        <div className={css.cardWrapper}>
            <div className="app-container">
                <div className={css.cardTitle}>Settings</div>

                <div className={css.cardContent}>
                    <div
                        className={css.cardItem}
                        onClick={() => {
                            trackTelemetree(
                                eventBuilder,
                                'PROFILE_PAGE: settings event',
                                {
                                    name: 'Language',
                                }
                            );
                        }}
                    >
                        <span>Language</span>
                        <span className={css.cardItemLabel}>English</span>
                    </div>
                    <div
                        className={css.cardItem}
                        onClick={() => {
                            trackTelemetree(
                                eventBuilder,
                                'PROFILE_PAGE: settings event',
                                {
                                    name: 'Local currency',
                                }
                            );
                        }}
                    >
                        <span>Local currency</span>
                        <span className={css.cardItemLabel}>USD</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
