import css from './settings.module.css';

export const Settings = () => {
    return (
        <>
            <div className={css.wrap}>
                <span className={css.title}>Settings</span>
                <div className={css.settingWrap}>
                    <div className={css.setting}>
                        <span className={css.title}>Language</span>
                        <span className={css.label}>English</span>
                    </div>
                    <div className={css.setting}>
                        <span className={css.title}>Local currency</span>
                        <span className={css.label}>USD</span>
                    </div>
                </div>
            </div>
            <div className={css.gitPages}>
                <a
                    href="https://holstby.github.io/etf-exchange-ton-fund-gitbook/docs/introduction.html"
                    target="_blank"
                    rel="noreferrer"
                >
                    GitPages
                </a>
            </div>
        </>
    );
};
