// Templates
import AppButton from '@/components/AppButton/AppButton';
// Style
import css from './purchase-sell-footer.module.css';

export interface PurchaseSellFooterProps {
    title: string;
    onClick: () => void;
    isLoading: boolean;
    isDisabled: boolean;
}

const PurchaseSellFooter = (props: PurchaseSellFooterProps) => {
    return (
        <footer className={css.footer}>
            <AppButton
                className={css.button}
                label={props.title}
                onClick={props.onClick}
                isLoading={props.isLoading}
                isDisabled={true}
            />
        </footer>
    );
};

export default PurchaseSellFooter;
