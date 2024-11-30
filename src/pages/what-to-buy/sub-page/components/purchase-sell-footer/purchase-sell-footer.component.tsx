// Templates
import AppButton from '@/components/AppButton/AppButton';
// Style
import css from './purchase-sell-footer.module.css';

interface PurchaseSellFooterProps {
    title: string;
    onClick: () => void;
    isLoading: boolean;
}

const PurchaseSellFooter = (props: PurchaseSellFooterProps) => {
    return (
        <footer className={css.footer}>
            <AppButton
                className={css.button}
                label={props.title}
                onClick={props.onClick}
                isLoading={props.isLoading}
            />
        </footer>
    );
};

export default PurchaseSellFooter;
