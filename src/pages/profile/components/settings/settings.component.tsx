import { trackTelemetree } from '@/telemetree/telemetree-entry';
import css from './settings.module.css';
import { useTWAEvent } from '@tonsolutions/telemetree-react';
import { ProfileI18n } from '../../profile.i18n.model';
import { Locale } from '@/store/i18n/i18.store';

interface SettingsProps {
    i18nText: Pick<ProfileI18n, 'settings'>;
    setLocale: (locale: Locale) => void;
    locale: Locale;
}

export const Settings = ({ i18nText, setLocale, locale }: SettingsProps) => {
    const { settings: settingsText } = i18nText;

    const eventBuilder = useTWAEvent();

    const changeLang = () => {
        locale === 'en' ? setLocale('ru') : setLocale('en');
    };

    return (
        <div className={css.cardWrapper}>
            <div className="app-container">
                <div className={css.cardTitle}>{settingsText.title}</div>

                <div className={css.cardContent}>
                    <div
                        className={css.cardItem}
                        onClick={() => {
                            changeLang();
                            trackTelemetree(
                                eventBuilder,
                                'PROFILE_PAGE: settings event',
                                {
                                    name: 'Language',
                                }
                            );
                        }}
                    >
                        <span>{settingsText.language.title}</span>
                        <span className={css.cardItemLabel}>
                            {settingsText.language.value}
                        </span>
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
                        <span>{settingsText.currency.title}</span>
                        <span className={css.cardItemLabel}>
                            {settingsText.currency.value}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
