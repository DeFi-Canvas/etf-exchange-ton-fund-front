import AppButton from '@/components/AppButton/AppButton';
import css from './footer.module.css';

const ChartFooter = () => {
    return (
        <footer className={css.footer}>
            <AppButton label="Sell" type="secondary" />
            <AppButton label="Buy" />
        </footer>
    );
};

export default ChartFooter;
