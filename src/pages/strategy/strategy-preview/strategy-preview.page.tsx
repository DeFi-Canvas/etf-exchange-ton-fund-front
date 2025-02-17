import css from './strategy-preview.module.css';
import AppFooter from '@/components/app-footer/app-footer.components.tsx';
import AppButton from '@/components/app-button/app-button.component.tsx';
import cn from 'classnames';

export const StrategyPreview = () => {
    return (
        <div className={css.page}>
            <header className={'app-container'}>
                <h2 className="h2">Strategy preview</h2>
                <p className="body-m-regular color-text-dark-70 mt-1">
                    Look at the strategy preview, check all items and edit them
                    if necessary.
                </p>
            </header>
            <div className={cn('app-container', css.cardList)}>
                <div className={css.card}>Image + name fund</div>
                <div className={css.card}>About</div>
                <div className={css.card}>Asset inside</div>
                <div className={css.card}>Fees</div>
                <div className={css.card}>Author</div>
            </div>
            <AppFooter className={css.footer}>
                <AppButton
                    label="Edit"
                    type="secondary"
                    to={'/strategy/basics'}
                />
                <AppButton label="Save" to={'/strategy'} />
            </AppFooter>
        </div>
    );
};
