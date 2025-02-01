import { trackMixpanel } from '@/mixpanel/mixpanel-entry';
import css from './settings.module.css';

export const Settings = () => {
    return (
        <div className={css.cardWrapper}>
            <div className="app-container">
                <div className={css.cardTitle}>Settings</div>

                <div className={css.cardContent}>
                    <div
                        className={css.cardItem}
                        onClick={() => {
                            trackMixpanel('PROFILE_PAGE: settings event', {
                                name: 'Language',
                            });
                        }}
                        onTouchStart={() => {
                            trackMixpanel('PROFILE_PAGE: settings event', {
                                name: 'Local currency',
                            });
                        }}
                    >
                        <span>Language</span>
                        <span className={css.cardItemLabel}>English</span>
                    </div>
                    <div
                        className={css.cardItem}
                        onClick={() => {
                            trackMixpanel('PROFILE_PAGE: settings event', {
                                name: 'Local currency',
                            });
                        }}
                        onTouchStart={() => {
                            trackMixpanel('PROFILE_PAGE: settings event', {
                                name: 'Local currency',
                            });
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
